function convertHtml2JsonAndSet() {
    const htmlTextAreaValue = document.getElementById("html").value;
    const jsonObj = html2json(htmlTextAreaValue);
    const jsonArea = document.getElementById("json");
    jsonArea.textContent = JSON.stringify(jsonObj, null, 2);
}

function html2json(htmlText) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, "text/html");
    return nodeToJson(doc.body);
}

function nodeToJson(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent.trim();
        if (!text) return null;
        return { type: "text", text };
    }

    if (node.nodeType === Node.COMMENT_NODE) {
        return { type: "comment", text: node.textContent };
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
        const obj = {
            type: "element",
            tag: node.tagName.toLowerCase(),
            attrs: {},
            children: []
        };

        for (let attr of node.attributes) {
            obj.attrs[attr.name] = attr.value;
        }

        for (let child of node.childNodes) {
            const childObj = nodeToJson(child);
            if (childObj) obj.children.push(childObj);
        }

        return obj;
    }

    return null;
}




