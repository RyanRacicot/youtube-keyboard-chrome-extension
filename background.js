console.log('IN BACKGROUND SCRIPT')

chrome.commands.onCommand.addListener((cmd) => {
    switch (cmd) {
        case 'search':
            sendCurrentTabCommand('search')
            break
        case 'cycle_down':
            sendCurrentTabCommand('cycle_down')
            break
        case 'cycle_up':
            sendCurrentTabCommand('cycle_up')
            break

        default:
            console.log('Fall through case for cmd:', cmd)
            break
    }
    function sendCurrentTabCommand(cmd) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                { command: cmd },
                (response) => {
                    return response
                }
            )
        })
    }
})
