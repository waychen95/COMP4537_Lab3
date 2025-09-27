const template = require('../lang/messages/en/user')

class Utils {
    static getDate(name, date) {
        return template.greetings.replace("%1", name).replace("%2", date)
    }

    static getFileName(parsed_url) {
        const parts = parsed_url.split("/")
        const file_name = parts[parts.length - 1]
        return file_name
    }
}

module.exports = Utils