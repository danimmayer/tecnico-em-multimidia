(() => {
  "use strict";

  const storageKey = "producao-audiovisual-caderno-v1";
  const formSelector = "input, textarea, select, [contenteditable='true']";
  const saveState = document.querySelector("[data-save-state]");
  const rubricNames = [
    "rubrica-planejamento",
    "rubrica-linguagem",
    "rubrica-captacao",
    "rubrica-edicao",
    "rubrica-etica",
    "rubrica-equipe"
  ];

  function escapeAttribute(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  function textInput(name, label) {
    return `<input type="text" name="${escapeAttribute(name)}" aria-label="${escapeAttribute(label)}" autocomplete="off">`;
  }

  function selectInput(name, label, options) {
    const optionMarkup = options
      .map((option) => `<option>${escapeAttribute(option)}</option>`)
      .join("");
    return `<select name="${escapeAttribute(name)}" aria-label="${escapeAttribute(label)}">${optionMarkup}</select>`;
  }

  function populateRows() {
    const shotBody = document.querySelector("[data-shot-rows]");
    if (shotBody) {
      shotBody.innerHTML = Array.from({ length: 8 }, (_, index) => {
        const row = index + 1;
        return `
          <tr>
            <th scope="row">${String(row).padStart(2, "0")}</th>
            <td>${textInput(`plano-tipo-${row}`, `Plano e ângulo ${row}`)}</td>
            <td><textarea name="plano-acao-${row}" aria-label="Ação essencial ${row}"></textarea></td>
            <td>${textInput(`plano-mov-${row}`, `Movimento ${row}`)}</td>
            <td>${textInput(`plano-som-${row}`, `Som ${row}`)}</td>
            <td>${selectInput(`plano-prioridade-${row}`, `Prioridade ${row}`, ["A", "B", "C"])}</td>
          </tr>`;
      }).join("");
    }

    const scheduleBody = document.querySelector("[data-schedule-rows]");
    if (scheduleBody) {
      scheduleBody.innerHTML = Array.from({ length: 6 }, (_, index) => {
        const row = index + 1;
        return `
          <tr>
            <td>${textInput(`agenda-hora-${row}`, `Horário da etapa ${row}`)}</td>
            <td>${textInput(`agenda-plano-${row}`, `Planos ou cena da etapa ${row}`)}</td>
            <td>${textInput(`agenda-local-${row}`, `Local da etapa ${row}`)}</td>
            <td>${textInput(`agenda-pessoas-${row}`, `Pessoas da etapa ${row}`)}</td>
            <td>${textInput(`agenda-equip-${row}`, `Equipamento da etapa ${row}`)}</td>
            <td>${textInput(`agenda-margem-${row}`, `Margem da etapa ${row}`)}</td>
          </tr>`;
      }).join("");
    }

    const roleBody = document.querySelector("[data-role-rows]");
    if (roleBody) {
      roleBody.innerHTML = Array.from({ length: 6 }, (_, index) => {
        const row = index + 1;
        return `
          <tr>
            <th scope="row">${textInput(`papel-pessoa-${row}`, `Nome do integrante ${row}`)}</th>
            <td>${textInput(`papel-pre-${row}`, `Função na pré-produção do integrante ${row}`)}</td>
            <td>${textInput(`papel-cap1-${row}`, `Função na captação 1 do integrante ${row}`)}</td>
            <td>${textInput(`papel-cap2-${row}`, `Função na captação 2 do integrante ${row}`)}</td>
            <td>${textInput(`papel-pos-${row}`, `Função na pós-produção do integrante ${row}`)}</td>
            <td>${textInput(`papel-mostra-${row}`, `Função na mostra do integrante ${row}`)}</td>
          </tr>`;
      }).join("");
    }

    const equipmentBody = document.querySelector("[data-equipment-rows]");
    if (equipmentBody) {
      equipmentBody.innerHTML = Array.from({ length: 8 }, (_, index) => {
        const row = index + 1;
        return `
          <tr>
            <td>${textInput(`equip-item-${row}`, `Item ou patrimônio ${row}`)}</td>
            <td><input type="number" name="equip-qtd-${row}" min="0" aria-label="Quantidade do item ${row}"></td>
            <td>${textInput(`equip-estado-saida-${row}`, `Estado na retirada do item ${row}`)}</td>
            <td>${textInput(`equip-acessorios-${row}`, `Acessórios do item ${row}`)}</td>
            <td>${textInput(`equip-estado-volta-${row}`, `Estado na devolução do item ${row}`)}</td>
            <td><input type="checkbox" name="equip-conf-${row}" aria-label="Item ${row} conferido"></td>
          </tr>`;
      }).join("");
    }

    const takeBody = document.querySelector("[data-take-rows]");
    if (takeBody) {
      takeBody.innerHTML = Array.from({ length: 10 }, (_, index) => {
        const row = index + 1;
        return `
          <tr>
            <td>${textInput(`take-plano-${row}`, `Cena ou plano do registro ${row}`)}</td>
            <td>${textInput(`take-num-${row}`, `Número da tomada ${row}`)}</td>
            <td>${textInput(`take-arquivo-${row}`, `Arquivo da tomada ${row}`)}</td>
            <td>${selectInput(`take-imagem-${row}`, `Qualidade de imagem ${row}`, ["—", "OK", "Atenção", "Refazer"])}</td>
            <td>${selectInput(`take-som-${row}`, `Qualidade de som ${row}`, ["—", "OK", "Atenção", "Refazer"])}</td>
            <td>${selectInput(`take-avaliacao-${row}`, `Avaliação da tomada ${row}`, ["—", "Boa", "Reserva", "Descartar"])}</td>
            <td>${textInput(`take-obs-${row}`, `Observação da tomada ${row}`)}</td>
          </tr>`;
      }).join("");
    }

    const editBody = document.querySelector("[data-edit-rows]");
    if (editBody) {
      editBody.innerHTML = Array.from({ length: 8 }, (_, index) => {
        const row = index + 1;
        return `
          <tr>
            <td>${textInput(`revisao-tc-${row}`, `Timecode da revisão ${row}`)}</td>
            <td>${textInput(`revisao-problema-${row}`, `Problema da revisão ${row}`)}</td>
            <td>${textInput(`revisao-alteracao-${row}`, `Alteração da revisão ${row}`)}</td>
            <td>${textInput(`revisao-resp-${row}`, `Responsável pela revisão ${row}`)}</td>
            <td><input type="checkbox" name="revisao-feito-${row}" aria-label="Revisão ${row} concluída"></td>
          </tr>`;
      }).join("");
    }

    const showBody = document.querySelector("[data-show-rows]");
    if (showBody) {
      showBody.innerHTML = Array.from({ length: 10 }, (_, index) => {
        const row = index + 1;
        return `
          <tr>
            <th scope="row">${String(row).padStart(2, "0")}</th>
            <td>${textInput(`mostra-hora-${row}`, `Horário da exibição ${row}`)}</td>
            <td>${textInput(`mostra-equipe-${row}`, `Equipe da exibição ${row}`)}</td>
            <td>${textInput(`mostra-titulo-${row}`, `Título da exibição ${row}`)}</td>
            <td>${textInput(`mostra-duracao-${row}`, `Duração da exibição ${row}`)}</td>
            <td><input type="checkbox" name="mostra-conf-${row}" aria-label="Arquivo da exibição ${row} conferido"></td>
          </tr>`;
      }).join("");
    }
  }

  function collectData() {
    const data = {};
    document.querySelectorAll(formSelector).forEach((field, index) => {
      const key = field.getAttribute("name") || `contenteditable-${index}`;
      if (field.matches("[contenteditable='true']")) {
        data[key] = field.textContent;
      } else if (field.type === "radio") {
        if (!(key in data)) {
          data[key] = "";
        }
        if (field.checked) {
          data[key] = field.value;
        }
      } else if (field.type === "checkbox") {
        data[key] = field.checked;
      } else {
        data[key] = field.value;
      }
    });
    return data;
  }

  function saveData() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(collectData()));
      if (saveState) {
        saveState.textContent = "Preenchimento salvo neste navegador.";
      }
    } catch {
      if (saveState) {
        saveState.textContent = "O navegador não permitiu salvar; a impressão continua disponível.";
      }
    }
  }

  function restoreData() {
    let data;
    try {
      data = JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch {
      data = {};
    }

    document.querySelectorAll(formSelector).forEach((field, index) => {
      const key = field.getAttribute("name") || `contenteditable-${index}`;
      if (!(key in data)) {
        return;
      }

      if (field.matches("[contenteditable='true']")) {
        field.textContent = data[key];
      } else if (field.type === "radio") {
        field.checked = data[key] === field.value;
      } else if (field.type === "checkbox") {
        field.checked = Boolean(data[key]);
      } else {
        field.value = data[key];
      }
    });
  }

  function updateRubric() {
    const total = rubricNames.reduce((sum, name) => {
      const field = document.querySelector(`[name="${name}"]`);
      if (!field) {
        return sum;
      }
      const maximum = Number(field.max);
      const value = Math.min(Math.max(Number(field.value) || 0, 0), maximum);
      return sum + value;
    }, 0);
    const output = document.querySelector("[data-rubric-total]");
    if (output) {
      output.textContent = `${total} / 100`;
    }
  }

  function updateExamProgress() {
    ["a", "b"].forEach((exam) => {
      const section = document.querySelector(`[data-exam="${exam}"]`);
      const output = document.querySelector(`[data-exam-progress="${exam}"]`);
      if (!section || !output) {
        return;
      }
      const answered = new Set(
        Array.from(section.querySelectorAll('input[type="radio"]:checked'), (field) => field.name)
      ).size;
      output.textContent = `${answered} de 10 respondidas`;
    });
  }

  function clearData() {
    localStorage.removeItem(storageKey);
    document.querySelectorAll(formSelector).forEach((field) => {
      if (field.matches("[contenteditable='true']")) {
        field.innerHTML = "";
      } else if (field.type === "checkbox" || field.type === "radio") {
        field.checked = false;
      } else if (field.tagName === "SELECT") {
        field.selectedIndex = 0;
      } else if (field.matches("[data-keep-default]")) {
        return;
      } else {
        field.value = field.defaultValue || "";
      }
    });
    updateRubric();
    updateExamProgress();
    if (saveState) {
      saveState.textContent = "Campos limpos. Novos dados serão salvos neste navegador.";
    }
  }

  populateRows();
  restoreData();
  updateRubric();
  updateExamProgress();

  let saveTimer;
  document.addEventListener("input", (event) => {
    if (!event.target.matches(formSelector)) {
      return;
    }
    window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(saveData, 250);
    if (rubricNames.includes(event.target.name)) {
      updateRubric();
    }
    if (event.target.type === "radio") {
      updateExamProgress();
    }
  });

  document.addEventListener("change", (event) => {
    if (event.target.matches(formSelector)) {
      saveData();
      updateRubric();
      updateExamProgress();
    }
  });

  const printMode = document.querySelector("[data-print-mode]");
  document.querySelector("[data-print]")?.addEventListener("click", () => {
    document.body.dataset.printMode = printMode?.value || "caderno";
    window.print();
  });
  window.addEventListener("afterprint", () => {
    delete document.body.dataset.printMode;
  });

  const clearDialog = document.querySelector("[data-clear-dialog]");
  document.querySelector("[data-clear]")?.addEventListener("click", () => {
    if (typeof clearDialog?.showModal === "function") {
      clearDialog.showModal();
    } else if (window.confirm("Limpar todo o preenchimento salvo neste navegador?")) {
      clearData();
    }
  });

  clearDialog?.addEventListener("close", () => {
    if (clearDialog.returnValue === "confirm") {
      clearData();
    }
  });
})();
