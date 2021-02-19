//// Task #1
const XMLParser = new DOMParser()

const xmlObj = {
    list: [

    ]
}

const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`

const xmlDOM = XMLParser.parseFromString(xmlString, 'text/xml')

const nodes = xmlDOM.querySelectorAll('*')

for (var i = 0; i < nodes.length; i++) {
    var text = null;
    if (nodes[i].childNodes.length == 1 && nodes[i].childNodes[0].nodeType == 3) 
        text = nodes[i].textContent; 
    console.log("TageName : ", nodes[i].tagName, ", Text : ", text);
}

