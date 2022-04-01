class CustomLink implements Link {
  rawLink: string;

  domain: string;

  slug: string;

  constructor(rawLink = '') {
    this.rawLink = rawLink;
    const [domain, ...slugArray] = rawLink.split('/');
    this.domain = domain;
    this.slug = slugArray.join('/');
  }

  isValid(): boolean {
    return this.rawLink !== '';
  }

  toString(): string {
    return `${this.domain}/${this.slug}`;
  }
}

export default CustomLink;
