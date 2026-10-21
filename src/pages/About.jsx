import { Link } from "react-router-dom";

function About() {
  const features = [
    {
      icon: "🔍",
      title: "Discover Movies",
      description:
        "Search for movies and explore titles from across the world of cinema."
    },
    {
      icon: "🎬",
      title: "Explore Genres",
      description:
        "Browse curated movie selections across action, comedy, horror, sci-fi, and animation."
    },
    {
      icon: "⭐",
      title: "Movie Details",
      description:
        "Explore movie ratings, release dates, cast information, and story descriptions."
    },
    {
      icon: "▶",
      title: "Watch Trailers",
      description:
        "Find trailers for the movies that catch your attention."
    }
  ];

  const technologies = [
    "React",
    "JavaScript",
    "CSS3",
    "React Router",
    "OMDb API"
  ];

  return (
    <main className="about__page">

      {/* HERO SECTION */}
      <section className="about__hero">
        <div className="about__hero__content">

          <p className="small__title">
            BEHIND THE EXPERIENCE
          </p>

          <h1>
            More Than Just
            <br />
            <span>Movies.</span>
          </h1>

          <p className="about__description">
            CineVerse is a cinematic movie discovery
            experience designed to help you explore
            unforgettable stories, discover new favorites,
            and find your next movie adventure.
          </p>

          <Link
            to="/"
            className="about__button"
          >
            Explore CineVerse →
          </Link>

        </div>

        <div className="about__visual" aria-hidden="true">
          <div className="about__visual__circle">
            <span>▶</span>
          </div>

          <h2>
            CINE<span>VERSE</span>
          </h2>

          <p>A WORLD OF STORIES</p>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="about__features">

        <div className="about__section__heading">
          <p className="small__title">
            THE EXPERIENCE
          </p>

          <h2>
            Everything You Need to
            <span> Explore Cinema.</span>
          </h2>

          <p>
            Discover the features that make CineVerse
            your gateway to the world of movies.
          </p>
        </div>

        <div className="about__features__grid">
          {features.map((feature) => (
            <div
              className="about__feature__card"
              key={feature.title}
            >
              <div className="about__feature__icon">
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TECHNOLOGY SECTION */}
      <section className="about__technology">

        <div className="about__technology__content">
          <p className="small__title">
            BUILT WITH MODERN TECHNOLOGY
          </p>

          <h2>
            Powered by <span>React.</span>
          </h2>

          <p>
            CineVerse is built using modern frontend
            technologies and integrates the OMDb API
            to provide movie information in a clean,
            interactive experience.
          </p>

          <div className="about__tech__list">
            {technologies.map((tech) => (
              <span key={tech}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="about__cta">
        <p className="small__title">
          YOUR NEXT MOVIE AWAITS
        </p>

        <h2>
          Ready to Discover
          <span> Something Amazing?</span>
        </h2>

        <p>
          Start exploring CineVerse and find
          your next favorite film.
        </p>

        <Link
          to="/"
          className="about__button"
        >
          Start Exploring →
        </Link>
      </section>

    </main>
  );
}

export default About;