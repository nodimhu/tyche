# Tyche

Tyche is a home savings tracking application named after the Greek Goddess of Fortune. Made with love on [SvelteKit](https://kit.svelte.dev) for [Sveltehack 2023](https://hack.sveltesociety.dev/).

Tyche is designed to be simple and user-friendly. Instead of laboriously tracking your expenses through individual transactions, which can be quite taxing to record, it computes monthly expenses by adding up your account balances and income. To log expenses, you only need to take a quick note, and it doesn't even have to be exact down to the penny.

## The idea

My partner and I track our finances using a simple method. We are only interested in seeing if we are on track to achieve our savings goals, while also having an idea of where our largest expenses go each month. We also wanted to keep it simple and not babysit a more complex tracking application, but we still wanted to get an overhead picture of our finances. Previously, we used a sheet for this, but when I found out about Sveltekit, I decided it was a great opportunity to reimplement our sheet as an application. I felt this would be a great project through which I could gain more experience in SvelteKit, which I had been eyeing since before its 1.0 release.

## Try Tyche

Access Tyche here: [https://tyche-sveltehack.nodim.hu](https://tyche-sveltehack.nodim.hu)

Registration is not possible in this demo, use the following login credentials to gain access:

| Login credentials |                           |
| ----------------- | ------------------------- |
| Username          | **sveltehack**            |
| Password          | **sveltehack2023IsAwesome** |

## Infrastructure

Tyche is written in TypeScript on [SvelteKit](https://kit.svelte.dev), and deployed to [Cloudflare Pages](https://pages.cloudflare.com/).

Persistent storage is realized with Cloudflare's [Durable Objects](https://www.cloudflare.com/products/durable-objects/) in a separate [Cloudflare Worker](https://workers.cloudflare.com/) project: [nodimhu/tyche-do-sveltehack](https://github.com/nodimhu/tyche-do-sveltehack) , which exposes a custom RPC-like API and it's also written in TypeScript.



## License notice

Copyright © 2023 Zsolt Nagy

This work is licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
