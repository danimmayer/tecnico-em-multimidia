/* Explicit slide windows prevent long practical activities from counting as short explanations. */
window.SENAI_SLIDE_PACE = function ({now, start, end, lessonStart, lessonEnd, isBreak, isLast}) {
  const clock = value => `${String(Math.floor(value / 60)).padStart(2, '0')}:${String(value % 60).padStart(2, '0')}`;
  if (now < lessonStart) return {level:'ok',message:`Aula começa às ${clock(lessonStart)}`};
  if (now >= lessonEnd) return {level:isLast ? 'ok' : 'err',message:isLast ? `Encerramento · ${clock(lessonEnd)}` : `Horário encerrado · finalizar até ${clock(lessonEnd)}`};
  if (isBreak && now >= start && now < end) return {level:'ok',message:`Intervalo no horário · retorno ${clock(end)}`};
  if (now < start - 2) return {level:'warn',message:`Adiantado ${Math.ceil(start - now)} min · etapa prevista ${clock(start)}–${clock(end)}`};
  if (now >= end + 2) return {level:'err',message:`Atrasado ${Math.floor(now - end)} min · etapa prevista até ${clock(end)}`};
  return {level:'ok',message:`No ritmo · etapa prevista ${clock(start)}–${clock(end)}`};
};
