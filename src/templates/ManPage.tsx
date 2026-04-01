import { Typo } from '../components/Typo';
import { Page } from './Page';

interface Props {
	url: string;
}

export function ManPage({ url }: Props) {
	return (
		<Page url={url}>
			<div className="flex flex-col gap-8">
				<h1 className="heading-1">Artem’s personal user manual</h1>
				<p className="typo-body">
					<Typo>
						This page aims to help my colleagues understand me better and to
						make our relationships easier and more productive.
					</Typo>
				</p>
				<div className="flex flex-col gap-4">
					<h2 className="heading-2">Overview</h2>
					<div
						className="
        flex flex-col gap-8
        md:flex-row
      "
					>
						<ul className="flex flex-col gap-2">
							<li className="typo-body">
								<Typo>
									<span aria-hidden="true">🦉</span> Morning owl (wake up early
									but sleepy all day)
								</Typo>
							</li>
							<li className="typo-body">
								<Typo>
									<span aria-hidden="true">☕️</span> Like coffee, tacos, books,
									nature
								</Typo>
							</li>
							<li className="typo-body">
								<Typo>
									<span aria-hidden="true">🍄</span> Dislike crowds, mushrooms,
									coriander, drinks with ice
								</Typo>
							</li>
							<li className="typo-body">
								<Typo>
									<span aria-hidden="true">📸</span> Hobbies: photography,
									cooking, leathercraft, couchpotatoing
								</Typo>
							</li>
							<li className="typo-body">
								<Typo>
									<span aria-hidden="true">☔️</span> Pronouns: he/him
								</Typo>
							</li>
							<li className="typo-body">
								<Typo>
									<span aria-hidden="true">🦜</span> My name is pronounced as{' '}
									<em>artyom</em> but I don’t mind if you say it differently
								</Typo>
							</li>
							<li className="typo-body">
								<Typo>
									<span aria-hidden="true">💾</span> Check out my{' '}
									<a className="link" href="/blog/">
										blog
									</a>
									,{' '}
									<a className="link" href="/book/">
										book on clean code
									</a>
									, and
									<a className="link" href="https://morning.photos/">
										photos
									</a>
									.
								</Typo>
							</li>
						</ul>
						<div
							className="
         -order-1 mx-auto
         md:order-0 md:mx-0
       "
						>
							<div className="expander">
								<img
									src="/images/me-4.jpg"
									alt="Artem Sapegin on the sea"
									width={700}
									height={700}
									className="image"
									loading="lazy"
								/>
							</div>
						</div>
					</div>
				</div>
				<section className="flex flex-col gap-4">
					<h2 className="heading-2">My work preferences</h2>
					<p className="typo-body">
						<Typo>
							I prefer to work from home. I have a perfect workplace, the best
							coffee in town, catered lunches (by me and my fiancée). The office
							environment is too distracting, and I get overwhelmed by too many
							things going on around me. Also, being around people all day is
							draining, and the commute on public transport is too stressful for
							me.
						</Typo>
					</p>
					<p className="typo-body">
						<Typo>
							I prefer written asynchronous communication over calls. It allows
							me to reread the question multiple times, think about what to
							answer, edit the text to make it clear, and have your response in
							text form to reference later. I have trouble staying focused
							during calls and quickly forget important details unless I make
							notes.
						</Typo>
					</p>
					<p className="typo-body">
						<Typo>
							I work in a way that I call _progressive JPEG method_: I try to
							make a minimal working version of a task as soon as possible, and
							share it, so I can have early and continuous feedback. It also
							means, if there’s a deadline, there are more chances we’ll have
							something to deploy.
						</Typo>
					</p>
					<p className="typo-body">
						<Typo>
							Probably, I’ll decline a “quick” call right now or a request to
							join an ongoing meeting. I need time to mentally prepare myself
							for a call.
						</Typo>
					</p>
					<p className="typo-body">
						<Typo>
							I’ll most likely don’t reply to a “hello” or “do you have a
							minute” message in chat. Feel free to write a more actionable
							message though (for example, “can you help me with X”).
						</Typo>
					</p>
					<p className="typo-body">
						<Typo>
							Lunch is sacred, and I have time for lunch blocked every day in my
							calendar. Also, you don’t want to work with me when I’m hangry.
						</Typo>
					</p>
					<p className="typo-body">
						<Typo>
							I mostly work between 9am and 5pm{' '}
							<abbr title="Central European Time">CET</abbr>.
						</Typo>
					</p>
					<p className="typo-body">
						<Typo>
							I’m always “away” in chat. It doesn’t mean I’m not there, but
							don’t expect an immediate answer — I often close chat and email to
							focus on work.
						</Typo>
					</p>
					<p className="typo-body">
						<Typo>I don’t check messages or emails during off-hours.</Typo>
					</p>
				</section>
				<section className="flex flex-col gap-4">
					<h2 className="heading-2">I do my best work when</h2>
					<p className="typo-body">
						<Typo>
							The task isn’t too big or abstract. I struggle to start a task
							when I don’t see an obvious first step.
						</Typo>
					</p>
					<p className="typo-body">
						<Typo>
							I understand why are we doing something, especially regarding the
							processes. If a certain task feels unnecessary or like a waste of
							time, I will do anything to avoid it.
						</Typo>
					</p>
					<p className="typo-body">
						<Typo>
							I know where things are, meaning all the tools and processes I
							need to do my work are documented and I know where to find them,
							and where to find the docs.
						</Typo>
					</p>
					<p className="typo-body">
						<Typo>I work with one or two people at a time.</Typo>
					</p>
					<p className="typo-body">
						<Typo>
							I receive feedback regularly, so I know I’m moving in the right
							direction.
						</Typo>
					</p>
				</section>
				<section className="flex flex-col gap-4">
					<h2 className="heading-2">The best way to give me feedback is</h2>
					<p className="typo-body">
						<Typo>
							Concrete and immediate but private: I need a specific example of
							something I did wrong, and ideally it shouldn’t be too long ago.
						</Typo>
					</p>
					<p className="typo-body">
						<Typo>Slack messages or a call work equally well.</Typo>
					</p>
				</section>
				<section className="flex flex-col gap-4">
					<h2 className="heading-2">I’m happy to help with</h2>
					<p className="typo-body">
						<Typo>Anything frontend.</Typo>
					</p>
				</section>
				<section className="flex flex-col gap-4">
					<h2 className="heading-2">I appreciate help with</h2>
					<p className="typo-body">
						<Typo>Talking to people I don’t know.</Typo>
					</p>
					<p className="typo-body">
						<Typo>Making deadlines and priorities clear.</Typo>
					</p>
					<p className="typo-body">
						<Typo>
							Organization and planning of any kind – I’m struggling with these
							things a lot.
						</Typo>
					</p>
					<p className="typo-body">
						<Typo>Reminding me of things I promised to do but forgot.</Typo>
					</p>
					<p className="typo-body">
						<Typo>Seeing the big picture if I dive too much into details.</Typo>
					</p>
				</section>
				<section className="flex flex-col gap-4">
					<h2 className="heading-2">A bit of my quirks and personality</h2>
					<p className="typo-body">
						<Typo>
							I’m happy to meet my team for lunch or anyone for coffee
							one-on-one once in a while, but you probably won’t see me in many
							social activities, all-company gatherings, etc.
						</Typo>
					</p>
					<p className="typo-body">
						<Typo>
							The best way of learning for me is by doing. I need to have all
							the docs and information I may need accessible at all times.
						</Typo>
					</p>
					<p className="typo-body">
						<Typo>
							I may seem rude to you — it’s not on purpose, and I’m trying to do
							my best to avoid it. English isn’t my native language, and Russian
							is way more direct.
						</Typo>
					</p>
					<p className="typo-body">
						<Typo>
							If I seem angry, I’m probably very tired, stressed, or
							overwhelmed, or hungry. Feel free to tell me about it.
						</Typo>
					</p>
					<p className="typo-body">
						<Typo>
							I’m not good at small talk, and I’ll probably be awkwardly quiet
							instead of initiating it.
						</Typo>
					</p>
				</section>
				<section className="flex flex-col gap-4">
					<h2 className="heading-2">And here’s where I work</h2>
					<div className="expander">
						<img
							src="/images/workplace-2024.webp"
							alt="My home office"
							width={1512}
							height={1207}
							className="image"
							loading="lazy"
						/>
					</div>
				</section>
				<section className="flex flex-col gap-4">
					<p className="typo-body">
						<Typo>
							P. S. I encourage everyone to make a personal user manual.{' '}
							<a
								className="link"
								href="https://www.flexos.work/learn/the-best-personal-user-manual-for-work-guide-template"
							>
								This article
							</a>{' '}
							is a good start.
						</Typo>
					</p>
				</section>
			</div>
		</Page>
	);
}
