import { Box } from '../components/Box';
import { Expander } from '../components/Expander';
import { Heading } from '../components/Heading';
import { Image } from '../components/Image';
import { Link } from '../components/Link';
import { Stack } from '../components/Stack';
import { TextTypo } from '../components/TextTypo';
import { Page } from './Page';

interface Props {
	url: string;
}

export function ManPage({ url }: Props) {
	return (
		<Page url={url}>
			<Stack gap="l">
				<Heading level={1}>Artem’s personal user manual</Heading>
				<TextTypo variant="intro">
					This page aims to help my colleagues understand me better and to make
					our relationships easier and more productive.
				</TextTypo>
				<Stack gap="m" as="section">
					<Heading level={2}>Overview</Heading>
					<Stack direction={{ base: 'column', tablet: 'row' }} gap="l">
						<Stack gap="s" as="ul">
							<TextTypo as="li">
								<span aria-hidden="true">🦉</span> Morning owl (wake up early
								but sleepy all day)
							</TextTypo>
							<TextTypo as="li">
								<span aria-hidden="true">🥨</span> Live in Berlin, Germany, but
								originally from Soviet Russia
							</TextTypo>
							<TextTypo as="li">
								<span aria-hidden="true">☕️</span> Like coffee, tacos, books,
								nature
							</TextTypo>
							<TextTypo as="li">
								<span aria-hidden="true">🍄</span> Dislike crowds, mushrooms,
								coriander, drinks with ice
							</TextTypo>
							<TextTypo as="li">
								<span aria-hidden="true">📸</span> Hobbies: photography,
								cooking, leathercraft, couchpotatoing
							</TextTypo>
							<TextTypo as="li">
								<span aria-hidden="true">☔️</span> Pronouns: he/him
							</TextTypo>
							<TextTypo as="li">
								<span aria-hidden="true">🦜</span> My name is pronounced as{' '}
								<em>artyom</em> but I don’t mind if you say it differently
							</TextTypo>
							<TextTypo as="li">
								<span aria-hidden="true">💾</span> Check out my{' '}
								<Link href="/blog/">blog</Link>,{' '}
								<Link href="/book/">book on clean code</Link>,{' '}
								<Link href="https://morning.photos/">photos</Link>, and{' '}
								<Link href="https://tacohuaco.co/">recipes</Link>
							</TextTypo>
						</Stack>
						<Box
							mx={{ base: 'auto', tablet: 0 }}
							order={{ base: -1, tablet: 0 }}
						>
							<Expander>
								<Image
									src="/images/me-4.jpg"
									alt="Artem Sapegin on the sea"
									width={700}
									height={700}
								/>
							</Expander>
						</Box>
					</Stack>
				</Stack>
				<Stack gap="m" as="section">
					<Heading level={2}>My work preferences</Heading>
					<TextTypo>
						I prefer to work from home. I have a perfect workplace, the best
						coffee in town, catered lunches (by me and my fiancée). The office
						environment is too distracting, and I get overwhelmed by too many
						things going on around me. Also, being around people all day is
						draining, and the commute on public transport is too stressful for
						me.
					</TextTypo>
					<TextTypo>
						I prefer written asynchronous communication over calls. It allows me
						to reread the question multiple times, think about what to answer,
						edit the text to make it clear, and have your response to reference
						later. I have trouble staying focused during calls and quickly
						forget important details (unless I make notes, which makes it even
						harder to focus).
					</TextTypo>
					<TextTypo>
						Probably, I’ll decline a “quick” call right now or a request to join
						an ongoing meeting. I need time to mentally prepare myself for a
						call.
					</TextTypo>
					<TextTypo>
						I’ll most likely don’t reply to a “hello” or “do you have a minute”
						message in chat. Feel free to write a more actionable message though
						(for example, “can you help me with X”).
					</TextTypo>
					<TextTypo>
						Lunch is sacred, and I have time for lunch blocked every day in my
						calendar. Also, you don’t want to work with me when I’m hangry.
					</TextTypo>
					<TextTypo>I mostly work between 9am and 5pm CET.</TextTypo>
					<TextTypo>
						I’m always “away” in chat. It doesn’t mean I’m not there but don’t
						expect an immediate answer — I often close chat and email to focus
						on work.
					</TextTypo>
					<TextTypo>
						I don’t have any work-related communication tools on my personal
						phone, and I don’t check messages or emails during off-hours.
					</TextTypo>
				</Stack>
				<Stack gap="m" as="section">
					<Heading level={2}>I do my best work when</Heading>
					<TextTypo>
						The task isn’t too big or abstract. I struggle to start a task when
						I don’t see an obvious first step.
					</TextTypo>
					<TextTypo>
						I understand why are we doing something, especially regarding the
						processes. If a certain task feels unnecessary or like a waste of
						time, I’d do anything to avoid it.
					</TextTypo>
					<TextTypo>
						I know where things are, meaning all the tools and processes I need
						to do my work are documented and I know where to find them, and
						where to find the docs.
					</TextTypo>
					<TextTypo>I work with one or two people at a time.</TextTypo>
					<TextTypo>
						I receive feedback regularly so I know I’m moving in the right
						direction.
					</TextTypo>
				</Stack>
				<Stack gap="m" as="section">
					<Heading level={2}>The best way to give me feedback is</Heading>
					<TextTypo>
						Concrete and immediate but private: I need a specific example of
						something I did wrong, and ideally it shouldn’t be too long ago.
					</TextTypo>
					<TextTypo>Slack messages or a call work equally well.</TextTypo>
				</Stack>
				<Stack gap="m" as="section">
					<Heading level={2}>I’m happy to help with</Heading>
					<TextTypo>Anything frontend.</TextTypo>
				</Stack>
				<Stack gap="m" as="section">
					<Heading level={2}>I appreciate help with</Heading>
					<TextTypo>Talking to people I don’t know.</TextTypo>
					<TextTypo>Making deadlines and priorities clear.</TextTypo>
					<TextTypo>
						Organization and planning of any kind – I’m struggling with these
						things a lot.
					</TextTypo>
					<TextTypo>
						Reminding me of things I promised to do but forgot.
					</TextTypo>
					<TextTypo>
						Seeing the big picture if I dive too much into details.
					</TextTypo>
				</Stack>
				<Stack gap="m" as="section">
					<Heading level={2}>A bit of my quirks and personality</Heading>
					<TextTypo>
						I’m happy to meet my team for lunch or anyone for coffee one-on-one
						once in a while but you probably won’t see me in many social
						activities, all-company gatherings, etc.
					</TextTypo>
					<TextTypo>
						The best way of learning for me is by doing. I need to have all the
						docs and information I may need accessible at all times.
					</TextTypo>
					<TextTypo>
						I may seem rude to you — it’s not on purpose, and I’m trying to do
						my best to avoid it. English isn’t my native language, and Russian
						is way more direct.
					</TextTypo>
					<TextTypo>
						If I seem angry, I’m probably very tired, stressed, or overwhelmed.
						Feel free to tell me about it.
					</TextTypo>
					<TextTypo>
						I’m not good at small talk, and I’ll probably be awkwardly quiet
						instead of initiating it.
					</TextTypo>
				</Stack>
				<Stack gap="m" as="section">
					<Heading level={2}>And here’s where I work</Heading>
					<Expander>
						<Image
							src="/images/workplace-2024.webp"
							alt="My home office"
							width={1512}
							height={1207}
						/>
					</Expander>
				</Stack>
				<Stack gap="m" as="section">
					<TextTypo>
						P. S. I encourage everyone to make a personal user manual.{' '}
						<Link href="https://www.flexos.work/learn/the-best-personal-user-manual-for-work-guide-template">
							This article
						</Link>{' '}
						is a good start.
					</TextTypo>
				</Stack>
			</Stack>
		</Page>
	);
}
