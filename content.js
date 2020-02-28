const videoQuerySelector = 'ytd-video-renderer'
var currentlySelectedResult

// document.addEventListener('keydown', (e) => {
//     console.log(e)
//     document.dispatchEvent(e)
// })

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.command) {
        case 'search':
            document
                .querySelector('input#search')
                .focus({ preventScroll: false })
            break

        case 'cycle_down':
            if (!currentlySelectedResult) {
                currentlySelectedResult = document.querySelector(
                    videoQuerySelector
                )
            } else {
                const results = document.querySelectorAll(videoQuerySelector)

                for (var i = 0; i < results.length; i++) {
                    if (
                        results[i] == currentlySelectedResult &&
                        i < results.length - 1
                    ) {
                        currentlySelectedResult = results[i + 1]
                        break
                    }
                }
            }
            scrollCurrentResultIntoView()
            unFocusSearchBar()
            break
        case 'cycle_up':
            if (currentlySelectedResult) {
                const results = document.querySelectorAll(videoQuerySelector)
                for (var i = 0; i < results.length; i++) {
                    if (results[i] == currentlySelectedResult && i > 0) {
                        currentlySelectedResult = results[i - 1]
                        break
                    }
                }
            }
            scrollCurrentResultIntoView()
            unFocusSearchBar()
            break

        default:
            break
    }
    sendResponse({ status: 'good' })

    function scrollCurrentResultIntoView() {
        const currentlySelectedResultLink = currentlySelectedResult.querySelector(
            'a#video-title'
        )
        console.log(currentlySelectedResultLink)
        currentlySelectedResultLink.focus()

        currentlySelectedResult.scrollIntoView(true)
        window.scrollBy(0, -currentlySelectedResult.offsetHeight / 2)
    }

    function unFocusSearchBar() {
        document.querySelector('input#search').blur()
    }
})
