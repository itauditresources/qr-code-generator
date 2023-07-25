/**
 * VCard
 * @export VCard
 * @class VCard
 * @implements {IVCard}
 * @implements {Document}
 * @property {string} name - The name of the VCard
 * @property {string} email - The email of the VCard
 * @property {string} phone - The phone of the VCard
 * @property {string} address - The address of the VCard
 * @property {string} company - The company of the VCard
 * @property {string} title - The title of the VCard
 * @property {string} website - The website of the VCard
 * @property {string} twitter - The twitter of the VCard
 * @property {string} github - The github of the VCard
 * @property {string} linkedin - The linkedin of the VCard
 *
 * 0.0.1 - initial version
 * @version 0.0.1
 *
 */

class VCard {
    public name: string;
    public email: string;
    public phone: string;
    public address: string;
    public company: string;
    public title: string;
    public website: string;
    public twitter: string;
    public github: string;
    public linkedin: string;

    constructor(
        name: string,
        email: string,
        phone: string,
        address: string,
        company: string,
        title: string,
        website: string,
        twitter: string,
        github: string,
        linkedin: string
    ) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.company = company;
        this.title = title;
        this.website = website;
        this.twitter = twitter;
        this.github = github;
        this.linkedin = linkedin;
    }

    public getName(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPhone(): string {
        return this.phone;
    }

    public getAddress(): string {
        return this.address;
    }

    public getCompany(): string {
        return this.company;
    }

    public getTitle(): string {
        return this.title;
    }

    public getWebsite(): string {
        return this.website;
    }

    public getTwitter(): string {
        return this.twitter;
    }

    public getGithub(): string {
        return this.github;
    }

    public getLinkedin(): string {
        return this.linkedin;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public setPhone(phone: string): void {
        this.phone = phone;
    }

    public setAddress(address: string): void {
        this.address = address;
    }

    public setCompany(company: string): void {
        this.company = company;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public setWebsite(website: string): void {
        this.website = website;
    }

    public setTwitter(twitter: string): void {
        this.twitter = twitter;
    }

    public setGithub(github: string): void {
        this.github = github;
    }

    public setLinkedin(linkedin: string): void {
        this.linkedin = linkedin;
    }

    public toString(): string {
        return `VCard: ${this.name} ${this.email} ${this.phone} ${this.address} ${this.company} ${this.title} ${this.website} ${this.twitter} ${this.github} ${this.linkedin}`;
    }

    public toJSON(): object {
        return {
            name: this.name,
            email: this.email,
            phone: this.phone,
            address: this.address,
            company: this.company,
            title: this.title,
            website: this.website,
            twitter: this.twitter,
            github: this.github,
            linkedin: this.linkedin,
        };
    }
}

export default VCard;
