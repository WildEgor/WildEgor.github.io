// Task #1

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

class XMLDomParser {
	
	constructor (xml) {
		this.xml = xml
	}
	
	parse (options) {
		const parser = new DOMParser()
		const dom = parser.parseFromString(this.xml, "application/xml")
		return this.convertNodes(dom, options)		
	}
	
	convertNodes (node, options) {
		let tempObject = {}
		let textContent = ""
		
		for (let item of node.childNodes) {
			let nodeName = item.nodeName.toLowerCase()
			let nodeType = item.nodeType
			
			// Element Node
			if (nodeType === 1) {
				let nodeContent = this.convertNodes(item, options)	

				if (nodeName === options.specialNodeName && nodeContent instanceof Object) {
					tempObject[options.specialNodeName] = this.simplifyObj(nodeContent).join(' ')
				} else {
					if (tempObject.hasOwnProperty(nodeName)) {
						if (tempObject[nodeName].constructor !== Array) { 
							tempObject[nodeName] = [tempObject[nodeName]]
						}
						tempObject[nodeName].push(nodeContent)
					} else {
						tempObject[nodeName] = nodeContent
					}
				}			
			}
			
			// Text Node
			if (nodeType === 3) {
				textContent = item.nodeValue.trim()
			}

			if (textContent) {
				tempObject = textContent
			}

			// Attributes
			if (item.attributes && item.attributes.length > 0) {
				let temp = {}
				for(let i = 0; i < item.attributes.length; i++) {
					let attribute = item.attributes.item(i);
                	temp[attribute.nodeName] = attribute.nodeValue;
				}
				Object.assign(tempObject, temp)
			}
		}
		return tempObject
	}

	simplifyObj (newObj) {
		return Object.values(newObj)
	}
}

window.addEventListener('load', () => {
	let opt = { specialNodeName: "name" }
	const xmlParser = new XMLDomParser(xmlString)
	const parsedXml = JSON.stringify(xmlParser.parse(opt), null, 4)
	console.log(parsedXml);
})