export interface Dictionary {
  nav: {
    home: string
    share: string
    stories: string
    language: string
    doogi: string
    contact: string
  }
  home: {
    title: string
    subtitle: string
    description: string
    features: string
    feature1: string
    feature2: string
    feature3: string
    feature4: string
    cta: string
  }

  share: {
    title: string
    childName: string
    childNamePlaceholder: string
    childWord: string
    childWordPlaceholder: string
    explanation: string
    explanationPlaceholder: string
    submit: string
    submitting: string
    success: string
    error: string
    validation: {
      childName: string
      childWord: string
      explanation: string
    }
  }
  stories: {
    title: string
    childsWord: string
    noStories: string
    shareYours: string
  }
  footer: {
    copyright: string
    description: string
    doogi: string
  }
  theme: {
    light: string
    dark: string
    cupcake: string
    emerald: string
  }
  about: {
    title: string
    content: string
  }
  contact: {
    title: string
    name: string
    email: string
    message: string
    send: string
    success: string
    error: string
  }
}
