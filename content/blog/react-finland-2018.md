---
title: 'React Finland 2018'
date: 2018-05-18
tags:
  - javascript
  - education
  - events
  - conferences
  - react
---

_This article was initially published [at the Wayfair tech blog](https://tech.wayfair.com/2018/05/react-finland-2018-tour-diary/). Here is a full version._

_[React Finland](https://react-finland.fi/) was held on April 24–26 in Helsinki, Finland. It was the first React conference in Finland. I was there with a workshop on [Component-driven development](https://react-finland.fi/workshops/#styleguide-driven-development)._

![Helsinki port](/images/blog/react-finland-2018.jpg)

## Conference

The conference was very well organized, especially for the first event. There were plenty of time between talks to relax, process information and talk to your friends. I think that’s a better format than extremely packed talks with five-minute breaks. The conference was a single-track — my favorite kind. The venue and the hotel, booked for speakers, were in five-minute walk from the Central Station with many good coffee places around — another benefit of long breaks.

The weather was the most perfect for a conference: +10˚C with occasional rain and, once, wet snow. You don’t want to go out much.

## Talks

### The New Best Practices by [Jani Eväkallio](https://twitter.com/jevakallio)

[Slides](https://www.dropbox.com/s/4dlke84ac4avtsz/jevakallio-react-finland-talk-final.key?dl=0#)

- React questioned best practices.
- We still have to make a choice (could lead to fatigue) but we have good tools now.
- Types are the best thing to document how things fucking work.
- Use Storybook (AS: or Styleguidist!) to document.
- We’re fucking clever. Clever solutions aren’t better than simple ones.
- Eventually we couldn’t improve React anymore, and a revolution will happen.
- Ignore best practice cops.

The new best practices according to Jani:

1. Build big things from small things.
2. Make code easy to copy and delete, not easy to change.
3. Write code for humans first.
4. Stay close to the language.
5. Don’t break things if you don’t have to.
6. Keep an open mind.

Check out Jani’s article, [The Present Future of User Interface Development](https://hackernoon.com/the-present-future-of-user-interface-development-ebd371255175).

> Do we need new best practices [for #React]? Well, not really. Just use the old ones :) Good “The New Best Practices” talk by @jevakallio at \#ReactFinland. Start small and write simple and clean code for humans. — [@walokra](https://twitter.com/walokra/status/989035775097483265)

### Declarative state and side effects by [Christian Alfoni](https://twitter.com/christianalfoni)

[Slides](https://docs.google.com/presentation/d/122lSAQ4fhDMnibDh65mTGmENWbT6PvGtfOl-VECVhLw/edit#slide=id.g357b7e9f27_0_5)

> @christianalfoni sharing the story of refactoring @codesandboxapp to @cerebraljs. The high level orchestration of logic and the debugger are really impressive! \#reactfinland — [@mweststrate](https://twitter.com/mweststrate/status/989043014990487552)

### <span aria-hidden="true">⚡️</span> Immer by [Michel Weststrate](https://twitter.com/mweststrate)

[Slides](http://immer.surge.sh/#1)

- _Callback hell_ becomes _spread hell_ when we try to modify nested immutable objects.
- 70 libraries on npm promise to make reducers shorter.
- [Immer](https://github.com/mweststrate/immer) allows you to create the next immutable state by mutating the current one.

I’ve seen Immer before and the API looks pretty nice. Examples in the talk shows that it’s significantly shorter than using object spread syntax or libraries like Immutable.

> Immer is a great little helper for Redux, developed by @mweststrate. He just gave a very entertaining talk about it at \#ReactFinland! <span aria-hidden="true">😁</span> — [@ddunderfelt](https://twitter.com/ddunderfelt/status/989051598105186305)

### <span aria-hidden="true">⚡️</span> Get Rich Quick With React Context by [Patrick Hund](https://twitter.com/wiekatz)

[Slides](https://technology-ebay-de.github.io/get-rich-quick-with-react-context/)

React context can be useful in some cases, like showing third-party ads in your app. The new API looks easier to use than the old one, and more explicit.

> “Get Rich Quick With React Context” lightning talk at \#ReactFinland by @wiekatz didn't tell how good job opportunities you have when doing React <span aria-hidden="true">😅</span> But how to insert ads. Also other use cases like localizations. — [@walokra](https://twitter.com/walokra/status/989059779254538240)

### <span aria-hidden="true">⚡️</span> There’s always a better way to handle localization by [Eemeli Aro](https://twitter.com/Eemeli_Aro)

[Slides](https://docs.google.com/presentation/d/e/2PACX-1vTnz2eogdCs9XG8tOsXEJw4CRBncm_ZJ1uGLoN3aqwXjIF5cL_P9KvNYRYpJfaUQNVW4JYUOjzroicp/pub?start=false&loop=false&delayms=3000#slide=id.p)

- JSON isn’t always the best format for storing your data.
- Especially for non-developers, like translators. YAML is better.
- Most translators aren’t used to translate UIs, they work with larger texts.
- Many solutions, like [react-intl](https://github.com/yahoo/react-intl), [react-i18next](https://github.com/i18next/react-i18next) or [react-message-context](https://github.com/eemeli/react-message-context), but no right answer.
- Localization is important, think how it should work and share your ideas with library authors, they’re hungry for attention.

> I agree with the heading! Keen to hear what Eemeli has to say: \#ReactFinland — [@ddunderfelt](https://twitter.com/ddunderfelt/status/989056079043670016)

### Styled-components, SSR, and Theming by [Kasia Jastrzębska](https://twitter.com/kejt_bw)

[Slides](https://www.dropbox.com/s/9k18qj11dlm5iin/styled-components-reactfinland.pdf?dl=0)

- Styled-components and other fancy things aren’t required to success of the project but they have some advantages.
- You still have to know CSS.
- Everything is local by default, but global styles are possible too.
- Specificity is a huge problem in CSS.
- Reuse styles as you reuse components.
- Server-side rendering: better UX, performance and SEO.

> “You are my styled-components to my React” <span aria-hidden="true">💞</span><span aria-hidden="true">💅</span> listening to @kejt_bw at \#reactfinland — [@thegreengreek](https://twitter.com/thegreengreek/status/989076428410048512)

### Universal React Apps Using Next.js by [Sia Karamalegos](https://twitter.com/thegreengreek)

[Slides](https://github.com/siakaramalegos/sia_speaks)

- 53% of mobile site visits are abandoned if pages take longer than three seconds to load.
- Server-side rendering and code splitting improves performance, especially for users of slow devices, like mobile phones.
- 100 KB of JavaScript is more expensive than 100 KB of images.
- Next.js simplifies server-side rendering, code splitting and prefetching future routes with React.

> “Server-side rendering and code-splitting can drastically improve user experience”. @thegreengreek spoke at \#ReactFinland about Universal \#React Apps Using \#NextJS. There are lots of old (mobile) devices which especially benefit from SSR. Slides at https://t.co/57v7bsthe8. — [@walokra](https://twitter.com/walokra/status/989101011695493121)

### State Management in React Apps with Apollo Client by [Sara Vieira](https://twitter.com/NikkitaFTW)

[Slides](https://link-state-is-dope.now.sh)

- Use [apollo-boost](https://github.com/apollographql/apollo-client/tree/master/packages/apollo-boost) to bootstrap Apollo with [apollo-link-state](https://github.com/apollographql/apollo-link-state) (for local state) and bunch of other things.

Using Apollo to manage state seems like a good idea if you’re already using Apollo to fetch the data from server. The API seems verbose but Redux is verbose too and having a single API to manage state (both server and client) is better than having two.

> Energetic talk by @NikkitaFTW at \#ReactFinland of State Management in \#React Apps with @ApolloGraphQL \#ApolloClient. Easy to setup: yarn add apollo-boost graphql react-apollo. Fast paced talk so have to see slides & demo later <span aria-hidden="true">😅</span> — [@walokra](https://twitter.com/walokra/status/989117594140594178)

### Detox: A year in. Building it, Testing with it by [Rotem Mizrachi-Meidan](https://twitter.com/rotemmiz)

[Slides](https://drive.google.com/file/d/1stojPsmq2fH1NyttOvLdd9fMWKpA-fqh/view)

> @rotemmiz proving the point of detox with mathematical arguments like a pro <span aria-hidden="true">😁</span> \#reactfinland — [@mweststrate](https://twitter.com/mweststrate/status/989129192615956480)

### Make linting great again by [Andrey Okonetchnikov](https://twitter.com/okonetchnikov)

[Slides](https://www.dropbox.com/s/i71vbslmbewkjb1/Make%20linting%20great%20-%20Short.key?dl=0)

- Linter is a tool that finds stupid bugs.
- But it’s easy to forget to run linter when you commit, and then, 10 minutes later, you see that CI is failing.
- Use [lint-staged](https://github.com/okonet/lint-staged) to run linters as a precommit hook and [husky](https://github.com/typicode/husky) to manage Git hooks.
- Use [Mrm](https://github.com/sapegin/mrm) to easily add lint-staged to your project: `npx mrm lint-staged`.

I’m a huge fan of lint-staged and recommend it to everyone.

> Use <span aria-hidden="true">🚫</span><span aria-hidden="true">💩</span> lint-staged and Mrm — great advice by @okonetchnikov \#reactfinland — [@iamsapegin](https://twitter.com/iamsapegin/status/989143288887283712)

### <span aria-hidden="true">⚡️</span> Understanding the differences is accepting by [Sven Sauleau](https://twitter.com/svensauleau)

[Slides](http://understanding-the-differences-is-accepting.ralf.cc/)

JavaScript is weird.

> It does not but I’ll allow it. \#ReactFinland — [@ddunderfelt](https://twitter.com/ddunderfelt/status/989145479907872768)

### <span aria-hidden="true">⚡️</span> Why I YAML by [Eemeli Aro](https://twitter.com/Eemeli_Aro)

[Slides](https://docs.google.com/presentation/d/e/2PACX-1vRFz5W8H1CavTWgQvPMRG6gud5ZXxy4TT9QNL82Zy8radlIGKhDps6cHMkCpjr1rP0t4j-Ofhceq6_M/pub?start=false&loop=false&delayms=3000#slide=id.p)

Eemeli has created a [new YAML library](https://github.com/eemeli/yaml) that support comments, reading and writing. I’m going to try it in [Mrm](https://github.com/sapegin/mrm).

### How React changed everything by [Ken Wheeler](https://twitter.com/ken_wheeler)

[Slides](https://reactfinland.surge.sh/)

- React feels like real app development, before libraries were HTML first.
- In React you don’t update your views manually (like in Backbone).
- Components are a big deal.
- React is the perfect abstraction.
- React has great community of wildly innovative folks.
- React has great developer experience, could be optimized (speed and size) without breaking the API.
- React is evolving: async rendering, suspense and time slicing.

Check out [Ken’s slides](https://reactfinland.surge.sh/#/10), they are awesome.

> How \#React changed everything (for better) talk by @ken_wheeler at \#ReactFinland started the 2nd day. Nice reality check to history of web tech and why React is great. Also shortly what comes next. But remember “Web is not suited for application development”. — [@walokra](https://twitter.com/walokra/status/989398496561201153)

<!-- textlint-disable -->

### <span aria-hidden="true">⚡️</span> Static Websites The Final Frontier by [Juho Vepsäläinen](https://twitter.com/bebraw)

<!-- textlint-enable -->

[Slides](https://docs.google.com/presentation/d/1dYwzzByKugHIrfA48cdhV0N-b2S2Ms_Ojd8I4ux_QRg/edit)

A nostalgic talk. The fire effect was my favorite thing in Photoshop 20 years ago — probably I still remember how to do it.

![Fire effect in Photoshop](/images/blog/react-finland-fire.png)

_(It wasn’t as easy as I thought.)_

### Get started with Reason by [Nik Graf](https://twitter.com/nikgraf)

[Slides](https://speakerdeck.com/nikgraf/get-started-with-reason)

- Great type inference.
- Super fast compiler.
- Make wrong states impossible with variants.
- Good interop with JavaScript.
- Variants as react props: type safety.
- Don’t rewrite everything to Reason, try one component first.

> Kick off with the basics of @ReasonML by @nikgraf at \#ReactFinland provided knowledge to dig further into \#ReasonReact for the next talk. \#ReasonML looks crafty, might be big in couple of years <span aria-hidden="true">🤔</span> In the meanwhile try it in personal project. — [@walokra](https://twitter.com/walokra/status/989412268415778816)

### Making Unreasonable States Impossible by [Patrick Stapfer](https://twitter.com/ryyppy)

[Slides](https://speakerdeck.com/ryyppy/making-unreasonable-states-impossible)

> Getting deeper into \#ReasonML and \#ReasonReact with @ryyppy's talk of Making Unreasonable States Impossible at \#ReactFinland by live coding tic-tac-toe. Learning by doing <span aria-hidden="true">👌</span> Exhaustive pattern matching forces edge-cases to be handled. — [@walokra](https://twitter.com/walokra/status/989422170634899458)

### Reactive State Machines and Statecharts by [David Khourshid](https://twitter.com/DavidKPiano)

[Slides](https://slides.com/davidkhourshid/reactive-statecharts/#/)

- The most neglected variable is time.
- Finite number of events and states.
- Don’t allow user to interact with the UI for two seconds before transition to a new state.
- Use objects to represent states.
- Generate analytics and integration tests.
- [xstate](https://github.com/davidkpiano/xstate), a functional, stateless JS finite state machines and statecharts.
- Statechart visualization from code.

> Great talk by @DavidKPiano on the benefits of using state machines in the ui. I know a few places where we should use this <span aria-hidden="true">😊</span> \#reactfinland — [@mweststrate](https://twitter.com/mweststrate/status/989443355980558336)

### ReactVR by [Shay Keinan](https://twitter.com/Shay_Keinan)

[Slides](https://www.dropbox.com/s/17fnydilior314p/react-webvr.zip?dl=0)

> As a three.js lover, I’m enjoying too much of @Shay_Keinan’s talk about \#ReactVR in \#ReactFinland — [@setelani](https://twitter.com/setelani/status/989458376110329857)

### World Class experience with React Native by Michał Chudziak

[Slides](https://drive.google.com/file/d/1vctNTqITKes-eb8OWMh6UOHm60gQSeC2/view)

> If you’re thinking of \#ReactNative development @michal_chudziak talk at \#ReactFinland was World Class experience. Set up friendly env with best \#DX, spot bugs early and deliver continuous builds. i.a GraphQL, Haul, CircleCI, Fastlane, ESLint, Flow, Jest, Danger, Detox. — [@walokra](https://twitter.com/walokra/status/989476627578048513)

### React Finland App — Lessons learned by [Toni Ristola](https://twitter.com/toniristola)

[Slides](https://www.dropbox.com/s/iktyzzwmt4t2co5/toni-ristola.pdf?dl=0)

> Every conference has to have an app and \#ReactFinland of course did \#ReactNative app. @toniristola talked about lessons learned. Fast start and dynamic data. Uses GraphQL and Apollo Client <span aria-hidden="true">👌</span> \#GoforeCrew — [@walokra](https://twitter.com/walokra/status/989480771713978368)

### React Native Ignite by [Gant Laborde](https://twitter.com/GantLaborde)

[Slides](http://infinite-red.slides.com/gantlaborde/bowser#/)

[Ignite](https://infinite.red/ignite), boilerplate and command-line tool to create React Native apps.

> Ignite for React Native looks incredible \#ReactFinland @infinite_red — [@barrymcgee](https://twitter.com/barrymcgee/status/989494531753238528)

### <span aria-hidden="true">⚡️</span> How to use React, webpack and other buzzwords if there is no need by [Varya Stepanova](https://twitter.com/varya_en)

[Slides](http://varya.me/react-finland-2018/#)

I’ve also spent a lot of time writing and rewriting my blog, instead of writing blog posts, and even ended up with my own [static site generator](/blog/why-fledermaus/). It’s a good way of learning and trying new things.

> Developing a blog instead of writing blog posts — that sounds very familiar. Great <span aria-hidden="true">⚡</span> talk by @varya_en at \#reactfinland — [@iamsapegin](https://twitter.com/iamsapegin/status/989505704296960000)

## Conclusion

There will be React Finland next year, probably closer to summer, when the weather is less shocking for those who aren’t used to snow and cold temperatures — that’s your chance to explore Finland, learn React and meet the Finnish React community.

## Resources

- [Photos](https://photos.google.com/share/AF1QipM9tBFWcEWKsJNfdXv2ae0j19Z0hN81ONBe4AUxcVz_8uVFLLVb56G5pGj_YVhQSw?key=OXNVXzd0U1ZCZVE4STk3QWJ3MkRoZEowN042a193) (shared album)
- [Slides of all talks](https://github.com/ReactFinland/slides)
- [Other posts about the conference](https://medium.com/react-finland/react-finland-2018-blog-coverage-e65bcece8946)
