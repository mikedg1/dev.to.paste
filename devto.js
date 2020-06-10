if (typeof markdownInput === 'undefined') { //Don't want this setup many time
    console.log('adding event listener')
    var markdownInput = document.getElementById('article_body_markdown')
    var previous = '' //Let's track what the last markdown was since eveyrthing I checked for checking the values fails to register

    const observer = new MutationObserver(function () {
        console.log('changed')
        //This copy text input is not always visible, seems we can listen to this and find out when it first appears
        if (document.querySelector('#image-markdown-copy-link-input') != null) {
            console.log('copy text is visible')
            //event listeners don't work since value change is programmatic
            //so let's just periodically check, once a second sounds good

            setInterval(function() {
                let latest = document.querySelector('#image-markdown-copy-link-input').value
                if (previous !== latest) {
                    insertAtCursor(markdownInput, document.querySelector('#image-markdown-copy-link-input').value)
                    previous = latest
                }
            }, 1000)
        }
    });

    const targetNode = document.getElementsByClassName('crayons-article-form__toolbar')[0]; //we want to capture when the markdown input gets added
    const config = {attributes: true, childList: true, subtree: true};
    observer.observe(targetNode, config);

    /**
     * Look for the paste event
     * 1- Get files from clipboard
     * 2- set files
     * 3- force change event so dev.to handles it as though we clicked the button and selected a file
     */
    window.addEventListener('paste', function (pasteEvent) {
        console.log('detected paste')
        let fileField = document.getElementById('image-upload-field')
        //Assumptions about .files being exactly what we need
        //It worked for some quick manual tests, will it work everywhere?
        //I don't know
        fileField.files = pasteEvent.clipboardData.files
        //Let the app do it's normal thing
        fileField.dispatchEvent(new Event(`change`))
    }, false);


    //From http://jsfiddle.net/Znarkus/Z99mK/
    function insertAtCursor(myField, myValue) {
        if (myField.selectionStart || myField.selectionStart === 0) {
            var startPos = myField.selectionStart;
            var endPos = myField.selectionEnd;
            myField.value = myField.value.substring(0, startPos)
                + myValue
                + myField.value.substring(endPos, myField.value.length);
            myField.selectionStart = startPos + myValue.length;
            myField.selectionEnd = startPos + myValue.length;
        }
    }
}