# Tyche

Tyche is a home savings tracking application named after the Greek Goddess of Fortune. Made with love on [SvelteKit](https://kit.svelte.dev). Tyche was originally a submission for [Sveltehack 2023](https://hack.sveltesociety.dev/), found at [](https://github.com/nodimhu/tyche-sveltehack). This repo is a continuation of that project.

Tyche is designed to be simple and user-friendly. Instead of laboriously tracking your expenses through individual transactions, which can be quite taxing to record, it computes monthly expenses by adding up your account balances and income. To log expenses, you only need to take a quick note, and it doesn't even have to be exact down to the penny.

## Infrastructure

Tyche is written in TypeScript and Svelte on [SvelteKit](https://kit.svelte.dev), and deployed to [Cloudflare Pages](https://pages.cloudflare.com/).

Persistent storage is realized with Cloudflare's [Durable Objects](https://www.cloudflare.com/products/durable-objects/) in a separate [Cloudflare Worker](https://workers.cloudflare.com/) project: [nodimhu/tyche-do](https://github.com/nodimhu/tyche-do), which exposes a custom RPC-like API and it's also written in TypeScript.

## License notice

Copyright © 2023 Zsolt Nagy

This work is licensed under the Apache License, Version 2.0 (the "License"); you may not use this work except in compliance with the License. You may obtain a copy of the License at

[https://www.apache.org/licenses/LICENSE-2.0](https://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
