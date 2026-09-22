import { ArrowUpRight } from 'lucide-react';
import presentationImg from '../assets/speechlab-presentation.jpg';
import groupImg from '../assets/speechlab-group.jpg';

export default function EventsPage() {
  return (
    <div className="ev">
      {/* ── HERO ── */}
      <section className="ev-hero">
        <div className="ev-hero-inner">
          <div className="ev-hero-copy">
            <span className="ev-label">Live in London</span>
            <h1 className="ev-hero-h1">
              Come speak<br />with us.
            </h1>
            <p className="ev-hero-sub">
              PowerPoint Karaoke, spontaneous speaking, quick-thinking
              challenges — and a room full of people willing to give it a go.
            </p>
            <a
              href="https://lu.ma/calendar/cal-oXV40hOhAgTjHHW"
              target="_blank"
              rel="noopener noreferrer"
              className="ev-hero-btn"
            >
              Explore our events in London
              <ArrowUpRight size={15} strokeWidth={2.5} />
            </a>
          </div>
          <div className="ev-hero-media">
            <img
              src={presentationImg}
              alt="SpeechLab — someone presenting to a small group"
            />
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="ev-proof">
        <div className="ev-proof-inner">
          <span className="ev-label">In the room</span>
          <p className="ev-proof-context">
            Students, founders and professionals from
          </p>
          <p className="ev-proof-names">
            LBS · LSE · UCL · Oxford · Cambridge · Google ·
            J.P.&nbsp;Morgan · McKinsey · Entrepreneur&nbsp;First ·
            VC&#8209;backed&nbsp;startups
          </p>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section className="ev-experience">
        <div className="ev-experience-inner">
          <div className="ev-experience-left">
            <span className="ev-label">The experience</span>
            <h2 className="ev-experience-h2">
              Less theory.<br />More speaking.
            </h2>
            <p className="ev-experience-sub">
              A modern practice club for clearer communication, quicker
              thinking and confidence built through&nbsp;repetition.
            </p>
          </div>
          <div className="ev-experience-right">
            <div className="ev-exp-row">
              <span className="ev-exp-num">01</span>
              <div>
                <h3 className="ev-exp-title">PowerPoint Karaoke</h3>
                <p className="ev-exp-desc">
                  Present slides you've never seen before and make something
                  of them.
                </p>
              </div>
            </div>
            <div className="ev-exp-row">
              <span className="ev-exp-num">02</span>
              <div>
                <h3 className="ev-exp-title">Think on your feet</h3>
                <p className="ev-exp-desc">
                  Practise explaining, answering and storytelling without a
                  script.
                </p>
              </div>
            </div>
            <div className="ev-exp-row">
              <span className="ev-exp-num">03</span>
              <div>
                <h3 className="ev-exp-title">Meet interesting people</h3>
                <p className="ev-exp-desc">
                  Small groups, lots of speaking time, and usually something
                  social afterwards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PHOTO BREAK ── */}
      <section className="ev-photo-break">
        <div className="ev-photo-break-inner">
          <img
            src={groupImg}
            alt="SpeechLab community after a session"
          />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="ev-cta">
        <div className="ev-cta-inner">
          <h2 className="ev-cta-h2">Fancy giving it a&nbsp;go?</h2>
          <p className="ev-cta-sub">You don't need to prepare anything.</p>
          <a
            href="https://lu.ma/calendar/cal-oXV40hOhAgTjHHW"
            target="_blank"
            rel="noopener noreferrer"
            className="ev-cta-btn"
          >
            See upcoming sessions
            <ArrowUpRight size={15} strokeWidth={2.5} />
          </a>
        </div>
      </section>

      {/* ── B2B ── */}
      <section className="ev-b2b">
        <div className="ev-b2b-inner">
          <div className="ev-b2b-left">
            <span className="ev-label">Private workshops</span>
            <h2 className="ev-b2b-h2">
              Bring SpeechLab<br />to your people.
            </h2>
            <p className="ev-b2b-sub">
              We run private communication workshops for teams, universities,
              founder communities and organisations — built around
              participation rather than&nbsp;lectures.
            </p>
          </div>
          <div className="ev-b2b-right">
            <div className="ev-b2b-row">
              <h3 className="ev-b2b-row-title">Teams</h3>
              <p className="ev-b2b-row-desc">
                Presentations, communication and thinking on your feet.
              </p>
            </div>
            <div className="ev-b2b-row">
              <h3 className="ev-b2b-row-title">Founders</h3>
              <p className="ev-b2b-row-desc">
                Pitching, storytelling and explaining complex ideas clearly.
              </p>
            </div>
            <div className="ev-b2b-row">
              <h3 className="ev-b2b-row-title">Campus &amp; communities</h3>
              <p className="ev-b2b-row-desc">
                Interactive workshops for universities, societies and
                professional communities.
              </p>
            </div>
            <a
              href="mailto:info@speechlab.uk?subject=SpeechLab%20Workshop%20Enquiry"
              className="ev-b2b-link"
            >
              Talk to us about a workshop
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
