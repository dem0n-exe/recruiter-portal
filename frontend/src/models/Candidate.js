export default class Candidate {
    constructor(id, name, experience, profile) {
        this.id = id;
        this.name = name;
        this.experience = experience;
        this.profile = profile;
    }

    getid() {
        return this.id;
    }

    getName() {
        return this.name;
    }
    getexperience() {
        return this.experience;
    }
    getprofile() {
        return this.profile;
    }

    setId(id) {
        this.id = id;
    }

    setName(name) {
        this.name = name;
    }
    setexperience(experience) {
        this.experience = experience;
    }
    setprofile(profile) {
        this.profile = profile;
    }
}