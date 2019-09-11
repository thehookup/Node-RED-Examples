[
    {
        "id": "29087dc3.231a82",
        "type": "mqtt in",
        "z": "1e7afa4b.385376",
        "name": "power0",
        "topic": "shellies/shellyem-B9EC7E/emeter/0/power",
        "qos": "2",
        "datatype": "auto",
        "broker": "3cc69636.e3e24a",
        "x": 170,
        "y": 200,
        "wires": [
            [
                "d781978a.6c6d48"
            ]
        ]
    },
    {
        "id": "d781978a.6c6d48",
        "type": "function",
        "z": "1e7afa4b.385376",
        "name": "Int",
        "func": "msg.payload = parseInt(msg.payload);\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 250,
        "y": 280,
        "wires": [
            [
                "465e8f72.67d6"
            ]
        ]
    },
    {
        "id": "465e8f72.67d6",
        "type": "change",
        "z": "1e7afa4b.385376",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "parts",
                "pt": "msg",
                "to": "1",
                "tot": "str"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 360,
        "y": 200,
        "wires": [
            [
                "4336ada6.90c494"
            ]
        ]
    },
    {
        "id": "4336ada6.90c494",
        "type": "join",
        "z": "1e7afa4b.385376",
        "name": "",
        "mode": "custom",
        "build": "array",
        "property": "payload",
        "propertyType": "msg",
        "key": "topic",
        "joiner": "\\n",
        "joinerType": "str",
        "accumulate": false,
        "timeout": "",
        "count": "2",
        "reduceRight": false,
        "reduceExp": "",
        "reduceInit": "",
        "reduceInitType": "num",
        "reduceFixup": "",
        "x": 410,
        "y": 300,
        "wires": [
            [
                "72bce05.80b112"
            ]
        ]
    },
    {
        "id": "72bce05.80b112",
        "type": "change",
        "z": "1e7afa4b.385376",
        "name": "SUM",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "$sum(payload)",
                "tot": "jsonata"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 530,
        "y": 300,
        "wires": [
            [
                "3dc89ac9.b6a7c6"
            ]
        ]
    },
    {
        "id": "5e994035.a969f",
        "type": "change",
        "z": "1e7afa4b.385376",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "parts",
                "pt": "msg",
                "to": "2",
                "tot": "str"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 360,
        "y": 420,
        "wires": [
            [
                "4336ada6.90c494"
            ]
        ]
    },
    {
        "id": "3dc89ac9.b6a7c6",
        "type": "delay",
        "z": "1e7afa4b.385376",
        "name": "Rate Limit",
        "pauseType": "rate",
        "timeout": "5",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "30",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": true,
        "x": 660,
        "y": 300,
        "wires": [
            [
                "80cc788e.0a6018"
            ]
        ]
    },
    {
        "id": "fbc11731.2637b8",
        "type": "function",
        "z": "1e7afa4b.385376",
        "name": "Int",
        "func": "msg.payload = -parseInt(msg.payload);\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 250,
        "y": 340,
        "wires": [
            [
                "5e994035.a969f"
            ]
        ]
    },
    {
        "id": "80cc788e.0a6018",
        "type": "function",
        "z": "1e7afa4b.385376",
        "name": "Clever Code",
        "func": "var devicePower = [28, 50];\nvar tol = .10;\nvar idle = 4;\nfunction binaryList(value, length) {\n  var list = [];\n\n            for (var i = 0; i < length; i++)\n            {\n                var result = ((value >> i) & 1) == 1;\n                list.push(result);\n            }\n            return list;\n}\n\nfor (var x = 0; x < Math.pow(2, devicePower.length); x++)\n{\n    var thisState = binaryList(x, devicePower.length)\n    var total = idle;\n    for(var j = 0; j < devicePower.length; j++)\n    {\n        total = total + devicePower[j]*thisState[j]\n    }\n    if(msg.payload/total > (1-tol) && msg.payload/total <(1+tol))\n    {\n        msg.payload = thisState;\n    }\n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 810,
        "y": 300,
        "wires": [
            [
                "d7432dfb.e0a03",
                "34e62c94.ae36b4"
            ]
        ]
    },
    {
        "id": "aa54b1a3.0972c",
        "type": "mqtt in",
        "z": "1e7afa4b.385376",
        "name": "power1",
        "topic": "shellies/shellyem-B9EC7E/emeter/1/power",
        "qos": "2",
        "datatype": "auto",
        "broker": "3cc69636.e3e24a",
        "x": 170,
        "y": 420,
        "wires": [
            [
                "fbc11731.2637b8"
            ]
        ]
    },
    {
        "id": "d7432dfb.e0a03",
        "type": "split",
        "z": "1e7afa4b.385376",
        "name": "",
        "splt": "\\n",
        "spltType": "str",
        "arraySplt": 1,
        "arraySpltType": "len",
        "stream": false,
        "addname": "",
        "x": 970,
        "y": 300,
        "wires": [
            [
                "689d6717.0791d8"
            ]
        ]
    },
    {
        "id": "34e62c94.ae36b4",
        "type": "debug",
        "z": "1e7afa4b.385376",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "x": 1050,
        "y": 140,
        "wires": []
    },
    {
        "id": "689d6717.0791d8",
        "type": "switch",
        "z": "1e7afa4b.385376",
        "name": "",
        "property": "parts.index",
        "propertyType": "msg",
        "rules": [
            {
                "t": "eq",
                "v": "0",
                "vt": "str"
            },
            {
                "t": "eq",
                "v": "1",
                "vt": "str"
            }
        ],
        "checkall": "true",
        "repair": false,
        "outputs": 2,
        "x": 1090,
        "y": 300,
        "wires": [
            [
                "5669b814.cf51a8"
            ],
            [
                "375be614.26f10a"
            ]
        ]
    },
    {
        "id": "5669b814.cf51a8",
        "type": "mqtt out",
        "z": "1e7afa4b.385376",
        "name": "",
        "topic": "ShellyEM/spaLight",
        "qos": "",
        "retain": "",
        "broker": "3cc69636.e3e24a",
        "x": 1210,
        "y": 220,
        "wires": []
    },
    {
        "id": "375be614.26f10a",
        "type": "mqtt out",
        "z": "1e7afa4b.385376",
        "name": "",
        "topic": "ShellyEM/poolLight",
        "qos": "",
        "retain": "",
        "broker": "3cc69636.e3e24a",
        "x": 1210,
        "y": 380,
        "wires": []
    },
    {
        "id": "deeb0d7f.d3dcc",
        "type": "function",
        "z": "1e7afa4b.385376",
        "name": "int*2",
        "func": "msg.payload = parseInt(msg.payload)*2;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 270,
        "y": 720,
        "wires": [
            [
                "2b470541.41e6ca"
            ]
        ]
    },
    {
        "id": "559adb78.feef14",
        "type": "mqtt in",
        "z": "1e7afa4b.385376",
        "name": "power1",
        "topic": "shellies/shellyem-B9EC7E/emeter/1/power",
        "qos": "2",
        "datatype": "auto",
        "broker": "3cc69636.e3e24a",
        "x": 190,
        "y": 800,
        "wires": [
            [
                "deeb0d7f.d3dcc"
            ]
        ]
    },
    {
        "id": "2b470541.41e6ca",
        "type": "delay",
        "z": "1e7afa4b.385376",
        "name": "Rate Limit",
        "pauseType": "rate",
        "timeout": "5",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "30",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": true,
        "x": 360,
        "y": 800,
        "wires": [
            [
                "f7a84e4.3f50eb"
            ]
        ]
    },
    {
        "id": "f7a84e4.3f50eb",
        "type": "function",
        "z": "1e7afa4b.385376",
        "name": "Clever Code",
        "func": "var devicePower = [560, 646, 5750, 69];\nvar tol = .05;\nvar idle = 13;\nfunction binaryList(value, length) {\n  var list = [];\n\n            for (var i = 0; i < length; i++)\n            {\n                var result = ((value >> i) & 1) == 1;\n                list.push(result);\n            }\n            return list;\n}\n\nfor (var x = 0; x < Math.pow(2, devicePower.length); x++)\n{\n    var thisState = binaryList(x, devicePower.length)\n    var total = idle;\n    for(var j = 0; j < devicePower.length; j++)\n    {\n        total = total + devicePower[j]*thisState[j]\n    }\n    if(msg.payload/total > (1-tol) && msg.payload/total <(1+tol))\n    {\n        msg.payload = thisState;\n    }\n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 470,
        "y": 720,
        "wires": [
            [
                "d9391ffa.2fdf6",
                "d1c39b7.b277368"
            ]
        ]
    },
    {
        "id": "d9391ffa.2fdf6",
        "type": "split",
        "z": "1e7afa4b.385376",
        "name": "",
        "splt": "\\n",
        "spltType": "str",
        "arraySplt": 1,
        "arraySpltType": "len",
        "stream": false,
        "addname": "",
        "x": 570,
        "y": 800,
        "wires": [
            [
                "3529d9c2.e40156"
            ]
        ]
    },
    {
        "id": "d1c39b7.b277368",
        "type": "debug",
        "z": "1e7afa4b.385376",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "x": 650,
        "y": 620,
        "wires": []
    },
    {
        "id": "3529d9c2.e40156",
        "type": "switch",
        "z": "1e7afa4b.385376",
        "name": "",
        "property": "parts.index",
        "propertyType": "msg",
        "rules": [
            {
                "t": "eq",
                "v": "0",
                "vt": "str"
            },
            {
                "t": "eq",
                "v": "1",
                "vt": "str"
            },
            {
                "t": "eq",
                "v": "2",
                "vt": "str"
            },
            {
                "t": "eq",
                "v": "3",
                "vt": "str"
            }
        ],
        "checkall": "true",
        "repair": false,
        "outputs": 4,
        "x": 730,
        "y": 720,
        "wires": [
            [
                "e44283b9.0abd3"
            ],
            [
                "7c42755a.d64cdc"
            ],
            [
                "3687735d.d90bcc"
            ],
            [
                "c0e49914.829058"
            ]
        ]
    },
    {
        "id": "e44283b9.0abd3",
        "type": "mqtt out",
        "z": "1e7afa4b.385376",
        "name": "",
        "topic": "ShellyEM/poolPump",
        "qos": "",
        "retain": "",
        "broker": "3cc69636.e3e24a",
        "x": 960,
        "y": 620,
        "wires": []
    },
    {
        "id": "7c42755a.d64cdc",
        "type": "mqtt out",
        "z": "1e7afa4b.385376",
        "name": "",
        "topic": "ShellyEM/poolCleaner",
        "qos": "",
        "retain": "",
        "broker": "3cc69636.e3e24a",
        "x": 960,
        "y": 680,
        "wires": []
    },
    {
        "id": "3687735d.d90bcc",
        "type": "mqtt out",
        "z": "1e7afa4b.385376",
        "name": "",
        "topic": "ShellyEM/poolHeater",
        "qos": "",
        "retain": "",
        "broker": "3cc69636.e3e24a",
        "x": 960,
        "y": 760,
        "wires": []
    },
    {
        "id": "c0e49914.829058",
        "type": "mqtt out",
        "z": "1e7afa4b.385376",
        "name": "",
        "topic": "ShellyEM/chlorineGenerator",
        "qos": "",
        "retain": "",
        "broker": "3cc69636.e3e24a",
        "x": 980,
        "y": 820,
        "wires": []
    },
    {
        "id": "3cc69636.e3e24a",
        "type": "mqtt-broker",
        "z": "",
        "name": "",
        "broker": "192.168.86.168",
        "port": "1883",
        "clientid": "",
        "usetls": false,
        "compatmode": true,
        "keepalive": "60",
        "cleansession": true,
        "birthTopic": "",
        "birthQos": "0",
        "birthPayload": "",
        "closeTopic": "",
        "closePayload": "",
        "willTopic": "",
        "willQos": "0",
        "willPayload": ""
    }
]