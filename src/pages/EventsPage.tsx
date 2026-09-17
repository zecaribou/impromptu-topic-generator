import { ArrowRight, Users, Presentation, Zap } from 'lucide-react';

export default function EventsPage() {
  return (
    <div className="animate-fade-in w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* SECTION 1 — HERO */}
      <section className="events-hero-section text-center max-w-2xl mx-auto mb-16 pt-4">
        <h1 className="events-hero-title">
          Come speak with us.
        </h1>
        <p className="events-hero-copy">
          PowerPoint Karaoke, spontaneous speaking, quick-thinking challenges — and a room full of people willing to give it a go.
        </p>
        <div className="flex flex-col items-center gap-3">
          <a
            href="https://luma.com/calendar/cal-oXV40hOhAgTjHHW"
            target="_blank"
            rel="noopener noreferrer"
            className="events-primary-btn"
          >
            Explore our events in London <ArrowRight size={18} />
          </a>
          <span className="events-subtle-tag">
            London &middot; Small groups &middot; Real practice &middot; Good people
          </span>
        </div>
      </section>

      {/* SECTION 2 — EVENT PHOTOGRAPHY (Editorial Frame Structure) */}
      <section className="w-full mb-20">
        <div className="events-photo-grid">
          {/* Main Large Editorial Frame */}
          <div className="events-photo-frame photo-main">
            <div className="events-photo-placeholder">
              <div className="events-photo-icon-wrap">
                <Users size={28} opacity={0.6} />
              </div>
              <span className="events-photo-caption">SpeechLab London Sessions</span>
              <span className="events-photo-subcaption">Live spontaneous speaking &amp; PowerPoint Karaoke</span>
            </div>
          </div>

          {/* Two Complementary Editorial Frames */}
          <div className="events-photo-side-stack">
            <div className="events-photo-frame photo-side-1">
              <div className="events-photo-placeholder">
                <div className="events-photo-icon-wrap">
                  <Presentation size={22} opacity={0.6} />
                </div>
                <span className="events-photo-caption">On-Stage Practice</span>
                <span className="events-photo-subcaption">Quick-thinking challenges</span>
              </div>
            </div>

            <div className="events-photo-frame photo-side-2">
              <div className="events-photo-placeholder">
                <div className="events-photo-icon-wrap">
                  <Zap size={22} opacity={0.6} />
                </div>
                <span className="events-photo-caption">Post-Session Socials</span>
                <span className="events-photo-subcaption">Casual drinks &amp; founder community</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — SOCIAL PROOF */}
      <section className="events-social-proof-section text-center w-full max-w-3xl mx-auto mb-20">
        <h2 className="events-social-title">
          Who joins SpeechLab?
        </h2>
        <p className="events-social-subtitle">
          Students, founders and professionals from
        </p>
        <div className="events-social-list">
          LBS &middot; LSE &middot; UCL &middot; Cambridge &middot; Google &middot; J.P. Morgan &middot; McKinsey &middot; Various VC-backed startups
        </div>
      </section>

      {/* SECTION 4 — WHAT HAPPENS AT SPEECHLAB */}
      <section className="w-full max-w-3xl mx-auto mb-20">
        <h2 className="events-section-heading text-center mb-10">
          What happens at SpeechLab
        </h2>
        <div className="events-features-grid">
          <div className="events-feature-card">
            <h3 className="events-feature-title">PowerPoint Karaoke</h3>
            <p className="events-feature-body">
              Present slides you've never seen before.
            </p>
          </div>

          <div className="events-feature-card">
            <h3 className="events-feature-title">Think on your feet</h3>
            <p className="events-feature-body">
              Practise answering, explaining and storytelling without a script.
            </p>
          </div>

          <div className="events-feature-card">
            <h3 className="events-feature-title">Meet interesting people</h3>
            <p className="events-feature-body">
              Small groups, lots of speaking time and usually something social afterwards.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5 — EVENTS CTA */}
      <section className="events-cta-banner w-full max-w-2xl mx-auto text-center mb-24">
        <h2 className="events-banner-title">
          Fancy giving it a go?
        </h2>
        <p className="events-banner-subtitle">
          You don't need to prepare anything.
        </p>
        <a
          href="https://luma.com/calendar/cal-oXV40hOhAgTjHHW"
          target="_blank"
          rel="noopener noreferrer"
          className="events-primary-btn"
        >
          Explore upcoming events in London <ArrowRight size={18} />
        </a>
      </section>

      {/* SECTION 6 — B2B WORKSHOPS */}
      <section className="events-b2b-section w-full max-w-3xl mx-auto">
        <div className="events-b2b-card">
          <h2 className="events-b2b-title">
            Bring SpeechLab to your people.
          </h2>
          <p className="events-b2b-copy">
            We also run private communication workshops for teams, universities, founder communities and organisations. Built around participation rather than lectures.
          </p>

          <div className="events-b2b-grid">
            <div className="events-b2b-item">
              <h3 className="events-b2b-item-title">Teams</h3>
              <p className="events-b2b-item-body">
                Communication, presentations and quick thinking.
              </p>
            </div>

            <div className="events-b2b-item">
              <h3 className="events-b2b-item-title">Founders</h3>
              <p className="events-b2b-item-body">
                Pitching, storytelling and explaining complex ideas clearly.
              </p>
            </div>

            <div className="events-b2b-item">
              <h3 className="events-b2b-item-title">Campus &amp; communities</h3>
              <p className="events-b2b-item-body">
                Interactive workshops for universities, societies and professional communities.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a
              href="mailto:hello@speechlab.uk?subject=SpeechLab%20Workshop%20Enquiry"
              className="events-b2b-btn"
            >
              Talk to us about a workshop &rarr;
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
