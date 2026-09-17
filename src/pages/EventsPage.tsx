import { ArrowUpRight } from 'lucide-react';
import speechlabPresentation from '../assets/speechlab-presentation.jpg';
import speechlabGroup from '../assets/speechlab-group.jpg';

export default function EventsPage() {
  return (
    <div className="events-lovable-container animate-fade-in w-full max-w-5xl mx-auto px-4 py-8">
      {/* HERO SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch mb-20 pt-4">
        <div className="flex flex-col justify-between py-2">
          <div>
            <span className="lovable-section-label mb-6 inline-block">LIVE IN LONDON</span>
            <h1 className="lovable-hero-title mb-6">
              Come speak<br />with us.
            </h1>
            <p className="lovable-hero-subheadline mb-8">
              PowerPoint Karaoke, spontaneous speaking, quick-thinking challenges — and a room full of people willing to give it a go.
            </p>
          </div>
          <div>
            <a
              href="https://luma.com/calendar/cal-oXV40hOhAgTjHHW"
              target="_blank"
              rel="noopener noreferrer"
              className="lovable-black-btn"
            >
              Explore our events in London <ArrowUpRight size={18} />
            </a>
            <p className="lovable-hero-tag mt-4">
              London &middot; Small groups &middot; Real practice
            </p>
          </div>
        </div>

        {/* Hero Photo Frame with real workshop presentation photo */}
        <div className="relative min-h-[360px] md:min-h-[440px] w-full rounded-md overflow-hidden border border-gray-200 shadow-sm bg-gray-100">
          <img 
            src={speechlabPresentation} 
            alt="SpeechLab presentation session" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded text-[11px] font-medium text-gray-700 shadow-sm border border-gray-200">
            SpeechLab photo / speaker mid-presentation
          </div>
        </div>
      </section>

      {/* EVENT PHOTOGRAPHY SECTION */}
      <section className="border-t border-gray-200 pt-12 pb-16">
        <span className="lovable-section-label mb-6 inline-block">THE COMMUNITY IN ACTION</span>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7 relative min-h-[300px] md:min-h-[380px] rounded-md overflow-hidden border border-gray-200 shadow-sm bg-gray-100">
            <img 
              src={speechlabPresentation} 
              alt="SpeechLab workshop presentation" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded text-[11px] font-medium text-gray-700 shadow-sm border border-gray-200">
              Interactive speaking &amp; PowerPoint Karaoke
            </div>
          </div>
          <div className="md:col-span-5 relative min-h-[300px] md:min-h-[380px] rounded-md overflow-hidden border border-gray-200 shadow-sm bg-gray-100">
            <img 
              src={speechlabGroup} 
              alt="SpeechLab London Community" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded text-[11px] font-medium text-gray-700 shadow-sm border border-gray-200">
              SpeechLab London Community
            </div>
          </div>
        </div>
      </section>

      {/* IN THE ROOM (SOCIAL PROOF) SECTION */}
      <section className="border-t border-gray-200 pt-12 pb-16">
        <span className="lovable-section-label mb-3 inline-block">IN THE ROOM</span>
        <p className="text-gray-500 text-base mb-6 font-normal">
          Students, founders and professionals from
        </p>
        <h2 className="lovable-social-proof-text">
          LBS &middot; LSE &middot; UCL &middot; Oxford &middot; Cambridge &middot; Google &middot; Meta &middot; McKinsey &middot; Entrepreneur First &middot; VC-backed startups
        </h2>
      </section>

      {/* THE EXPERIENCE SECTION */}
      <section className="border-t border-gray-200 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
          <div className="md:col-span-4">
            <span className="lovable-section-label">THE EXPERIENCE</span>
          </div>
          <div className="md:col-span-8">
            <h2 className="lovable-section-title mb-4">
              Less theory. More speaking.
            </h2>
            <p className="text-gray-500 text-lg max-w-xl leading-relaxed font-normal">
              A modern practice club for clearer communication, quicker thinking and confidence built through repetition.
            </p>
          </div>
        </div>

        {/* Numbered Rows 01, 02, 03 */}
        <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
          <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
            <span className="md:col-span-2 text-2xl font-light text-gray-400">01</span>
            <h3 className="md:col-span-4 text-xl font-bold text-gray-900">PowerPoint Karaoke</h3>
            <p className="md:col-span-6 text-gray-500 text-base leading-relaxed">
              Present slides you've never seen before and make something of them.
            </p>
          </div>

          <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
            <span className="md:col-span-2 text-2xl font-light text-gray-400">02</span>
            <h3 className="md:col-span-4 text-xl font-bold text-gray-900">Think on your feet</h3>
            <p className="md:col-span-6 text-gray-500 text-base leading-relaxed">
              Practise explaining, answering and storytelling without a script.
            </p>
          </div>

          <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
            <span className="md:col-span-2 text-2xl font-light text-gray-400">03</span>
            <h3 className="md:col-span-4 text-xl font-bold text-gray-900">Meet interesting people</h3>
            <p className="md:col-span-6 text-gray-500 text-base leading-relaxed">
              Small groups, plenty of speaking time, and usually something social afterwards.
            </p>
          </div>
        </div>
      </section>

      {/* FULL-WIDTH DARK CTA BANNER */}
      <section className="my-16 bg-black text-white p-8 md:p-14 rounded-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Fancy giving it a go?
          </h2>
          <p className="text-gray-400 text-base">
            You don't need to prepare anything.
          </p>
        </div>
        <a
          href="https://luma.com/calendar/cal-oXV40hOhAgTjHHW"
          target="_blank"
          rel="noopener noreferrer"
          className="lovable-white-btn whitespace-nowrap"
        >
          See upcoming sessions <ArrowUpRight size={18} />
        </a>
      </section>

      {/* FOR TEAMS & COMMUNITIES (B2B SECTION) */}
      <section className="py-12 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <span className="lovable-section-label mb-3 inline-block">FOR TEAMS &amp; COMMUNITIES</span>
            <h2 className="lovable-section-title mb-4">
              Bring SpeechLab to your people.
            </h2>
            <p className="text-gray-500 text-base leading-relaxed max-w-md">
              We run private communication workshops for teams, universities, founder communities and organisations — built around participation rather than lectures.
            </p>
          </div>

          <div className="md:col-span-7 flex flex-col">
            <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
              <div className="py-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Teams</h3>
                <p className="text-gray-500 text-sm md:text-base">
                  Presentations, communication and thinking on your feet.
                </p>
              </div>

              <div className="py-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Founders</h3>
                <p className="text-gray-500 text-sm md:text-base">
                  Pitching, storytelling and explaining complex ideas clearly.
                </p>
              </div>

              <div className="py-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Campus &amp; communities</h3>
                <p className="text-gray-500 text-sm md:text-base">
                  Interactive workshops for universities, societies and professional communities.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="mailto:hello@speechlab.uk?subject=SpeechLab%20Workshop%20Enquiry"
                className="inline-flex items-center gap-1.5 font-bold text-gray-900 hover:opacity-75 transition-opacity text-base"
              >
                Talk to us about a workshop <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
