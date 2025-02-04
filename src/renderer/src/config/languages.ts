import { LanguageDefinition } from '@renderer/core/domain'

export const getLanguages = (): LanguageDefinition[] => {
  const ldefs = [
    { id: 'es-ES', name: 'Spanish', subname: 'Spain' },
    { id: 'es-MX', name: 'Spanish', subname: 'Mexico' },
    { id: 'en-GB', name: 'English', subname: 'United Kingdom' },
    { id: 'en-US', name: 'English', subname: 'United States' },
    { id: 'fr-FR', name: 'French', subname: 'France' },
    { id: 'fr-CA', name: 'French', subname: 'Canada' },
    { id: 'de-DE', name: 'German', subname: 'Germany' },
    { id: 'it-IT', name: 'Italian', subname: 'Italy' },
    { id: 'pt-PT', name: 'Portuguese', subname: 'Portugal' },
    { id: 'pt-BR', name: 'Portuguese', subname: 'Brazil' },
    { id: 'zh-CN', name: 'Chinese', subname: 'China' },
    { id: 'ja-JP', name: 'Japanese', subname: 'Japan' },
    { id: 'ko-KR', name: 'Korean', subname: 'South Korea' },
    { id: 'ru-RU', name: 'Russian', subname: 'Russia' },
    { id: 'ar-SA', name: 'Arabic', subname: 'Saudi Arabia' },
    { id: 'hi-IN', name: 'Hindi', subname: 'India' },
    { id: 'nl-NL', name: 'Dutch', subname: 'Netherlands' },
    { id: 'sv-SE', name: 'Swedish', subname: 'Sweden' }
  ]

  return ldefs
}
