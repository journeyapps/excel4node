var select = require('xpath.js');
var dom = require('xmldom').DOMParser;
var pd = require('pretty-data').pd;

module.exports = XmlTestDoc;

function XmlTestDoc(xml) {
    // avoid bug in xpath lib by modifying xmlns attrib
    var xml = xml.replace('xmlns=', 'xmlns:x=');
    var doc = new dom().parseFromString(xml);

    this.select = function (path) {
        var nodes = select(doc, path);
        if (nodes && nodes.length) {
            return nodes.map(function (n) {
                return n.toString();
            });
        } else {
            return null;
        }
    };

    this.prettyPrint = function () {
        return (pd.xml(xml));
    };
}
