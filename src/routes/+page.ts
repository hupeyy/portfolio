export const ssr = false;
import type { Config } from '@sveltejs/adapter-vercel';

export const config: Config = {
    runtime: 'edge',
}