// 2hr

import OpenAI from 'openai';

export const openAI = new OpenAI({
  apiKey: '',
  dangerouslyAllowBrowser: true, // This is the default and can be omitted
});