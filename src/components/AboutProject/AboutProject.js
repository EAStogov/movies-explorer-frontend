import './AboutProject.css';

function AboutProject() {
  return(
    <section className="project">
      <h2 className="project__title">О проекте</h2>
      <div className="project__desc">
        <div className="project__stages">
          <h3 className="project__stages-title">Дипломный проект включал 5 этапов</h3>
          <p className="project__stages-subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="project__stages">
          <h3 className="project__stages-title">На выполнение диплома ушло 5 недель</h3>
          <p className="project__stages-subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="project__diagram">
        <div className="project__backend">
          <p className="project__weeks-back">1 неделя</p>
          <p className="project__weeks-subtitle">Back-end</p>
        </div>
        <div className="project__frontend">
          <p className="project__weeks-front">4 недели</p>
          <p className="project__weeks-subtitle">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;