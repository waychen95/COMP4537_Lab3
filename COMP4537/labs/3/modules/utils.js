const template = require('./lang/messages/en/user')

export class Utils {
    static getDate(name, date) {
        return template.greetings.replace("%1", name).replace("%2", date)
    }
}