import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="project">
      <h2 className="page__nav-title">О проекте</h2>
      <div className="project__desc">
        <div className="project__stages">
          <h3 className="project__stages-title">Дипломный проект включал 5 этапов</h3>
          <p className="project__stages-subtitle">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные
            доработки.
          </p>
        </div>
        <div className="project__stages">
          <h3 className="project__stages-title">На выполнение диплома ушло 5 недель</h3>
          <p className="project__stages-subtitle">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы
            успешно защититься.
          </p>
        </div>
      </div>
      <div className="project__diagram">
        <div className="project__diagram-part">
          <p className="project__part-back">1 неделя</p>
          <p className="project__part-subtitle">Back-end</p>
        </div>
        <div className="project__diagram-part">
          <p className="project__part-front">4 недели</p>
          <p className="project__part-subtitle">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
