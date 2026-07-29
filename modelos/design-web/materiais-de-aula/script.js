const storageKey = "design-web-caderno-daniel-mayer-v1";
const savedFields = [...document.querySelectorAll("[data-save]")];
const materialSelect = document.querySelector("#materialSelect");
const saveStatus = document.querySelector("#saveStatus");
const rubricFields = [...document.querySelectorAll("[data-rubric]")];
const rubricScore = document.querySelector("#rubricScore");

function isCheckable(field) {
  return field.type === "checkbox" || field.type === "radio";
}

function readSavedData() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) ?? {};
  } catch {
    return {};
  }
}

function restoreAnswers() {
  const saved = readSavedData();

  savedFields.forEach((field) => {
    if (!(field.id in saved)) return;

    if (isCheckable(field)) {
      field.checked = Boolean(saved[field.id]);
    } else {
      field.value = saved[field.id];
    }
  });
}

function collectAnswers() {
  return Object.fromEntries(
    savedFields.map((field) => [
      field.id,
      isCheckable(field) ? field.checked : field.value,
    ]),
  );
}

function resetField(field) {
  if (isCheckable(field)) {
    field.checked = false;
  } else if (field.defaultValue) {
    field.value = field.defaultValue;
  } else {
    field.value = "";
  }
}

let saveTimer;

function saveAnswers() {
  window.clearTimeout(saveTimer);
  saveStatus.textContent = "Salvando neste navegador…";

  saveTimer = window.setTimeout(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(collectAnswers()));
      saveStatus.textContent = "Respostas salvas somente neste navegador.";
    } catch {
      saveStatus.textContent = "O navegador não permitiu salvar. A impressão continua disponível.";
    }
  }, 250);
}

function updateRubricScore() {
  const anySelected = rubricFields.some((field) => field.value !== "");
  const allSelected = rubricFields.every((field) => field.value !== "");
  const total = rubricFields.reduce((sum, field) => {
    if (field.value === "") return sum;
    return sum + (Number(field.value) / 4) * Number(field.dataset.weight);
  }, 0);

  if (!anySelected) {
    rubricScore.textContent = "— / 100";
  } else if (allSelected) {
    rubricScore.textContent = `${total.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} / 100`;
  } else {
    rubricScore.textContent = `${total.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} / 100 · parcial`;
  }
}

function selectedSheet() {
  return document.querySelector(`[data-sheet="${materialSelect.value}"]`);
}

function printSelection() {
  const sheet = selectedSheet();
  if (!sheet) return;

  const answeredExam = sheet.matches(".exam-sheet")
    && sheet.querySelector('input[type="radio"]:checked');

  if (answeredExam) {
    const confirmed = window.confirm(
      "Esta prova contém respostas marcadas. Para imprimir uma cópia em branco, cancele e use “Limpar respostas”. Imprimir com as respostas atuais?",
    );
    if (!confirmed) return;
  }

  document.body.classList.add("print-single");
  sheet.classList.add("is-print-target");
  window.print();
}

function resetPrintState() {
  document.body.classList.remove("print-single");
  document.querySelectorAll(".is-print-target").forEach((sheet) => {
    sheet.classList.remove("is-print-target");
  });
}

savedFields.forEach((field) => {
  field.addEventListener("input", () => {
    saveAnswers();
    if (field.matches("[data-rubric]")) updateRubricScore();
  });
});

materialSelect.addEventListener("change", () => {
  selectedSheet()?.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelector("#printCurrent").addEventListener("click", printSelection);

document.querySelector("#printAll").addEventListener("click", () => {
  resetPrintState();
  window.print();
});

document.querySelector("#clearAnswers").addEventListener("click", () => {
  const sheet = selectedSheet();
  if (!sheet) return;

  const sheetFields = [...sheet.querySelectorAll("[data-save]")];
  const sheetTitle = sheet.querySelector("h2")?.textContent ?? "material selecionado";
  const confirmed = window.confirm(`Limpar as respostas de “${sheetTitle}” neste navegador?`);
  if (!confirmed) return;

  sheetFields.forEach(resetField);

  try {
    localStorage.setItem(storageKey, JSON.stringify(collectAnswers()));
  } catch {
    saveStatus.textContent = "As respostas foram limpas na tela, mas o navegador não atualizou o salvamento.";
    updateRubricScore();
    return;
  }

  updateRubricScore();
  saveStatus.textContent = `Respostas de “${sheetTitle}” removidas deste navegador.`;
});

window.addEventListener("afterprint", resetPrintState);

window.addEventListener("hashchange", () => {
  const target = document.querySelector(location.hash);
  if (target?.matches("[data-sheet]")) materialSelect.value = target.dataset.sheet;
});

restoreAnswers();
updateRubricScore();

if (location.hash) {
  const initialTarget = document.querySelector(location.hash);
  if (initialTarget?.matches("[data-sheet]")) {
    materialSelect.value = initialTarget.dataset.sheet;
  }
}
