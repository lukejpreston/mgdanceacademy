function getRecurringDate(start, end, day) {
    var recurringDate = ''
    var today = new Date()
    var year = today.getYear() + 1900
    var month = today.getMonth() + 1
    if (month < 10) month = '0' + month
    var daysOffset = (7 - today.getDay() + parseInt(day)) % 7
    var nextDate = new Date(today.getTime() + daysOffset * 24 * 60 * 60 * 1000).getDate()
    if (nextDate < 0) nextDate = '0' + nextDate

    recurringDate += '&e[0][date_start]=' + year + '-' + month + '-' + nextDate + escape(' ') + escape(start)
    recurringDate += '&e[0][date_end]=' + year + '-' + month + '-' + nextDate + escape(' ') + escape(end)

    return recurringDate
}

function addToCal(button, type, title, description, location, start, end, day) {
    if (type) {
        var addToCalUrl = "http://addtocalendar.com/atc/" + type + "?"

        addToCalUrl += 'utz=0'
        addToCalUrl += '&uln=en-US'
        addToCalUrl += '&vjs=1.5'
        addToCalUrl += '&e[0][privacy]=private'
        addToCalUrl += '&e[0][timezone]=Europe%2FLondon'
        addToCalUrl += '&e[0][organizer]=' + escape('{{site.owner}}')
        addToCalUrl += '&e[0][organizer_email]' + escape('{{site.email}}')


        addToCalUrl += '&e[0][title]=' + escape(title)
        addToCalUrl += '&e[0][description]=' + escape(description)
        addToCalUrl += '&e[0][location]=' + escape(location)

        if (day) addToCalUrl += getRecurringDate(start, end, day)
        else addToCalUrl += '&e[0][date_start]=' + start + '&e[0][date_end]=' + end

        button.href = addToCalUrl
    }
}
