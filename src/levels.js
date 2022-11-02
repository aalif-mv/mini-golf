const LEVELS_JSON = `
{
    "1": {
        "balls": [
            {
                "x": 162,
                "y": 380
            },
            {
                "x": 482,
                "y": 380
            }
        ],
        "holes": [
            {
                "x": 162,
                "y": 100,
                "r": 15
            },
            {
                "x": 482,
                "y": 100,
                "r": 15
            }
        ],
        "obstacles" : [
        ]
    },
    "2": {
        "balls": [
            {
                "x": 160,
                "y": 300
            },
            {
                "x": 480,
                "y": 300
            }
        ],
        "holes": [
            {
                "x": 160,
                "y": 400,
                "r": 15
            },
            {
                "x": 480,
                "y": 60,
                "r": 15
            }
        ],
        "obstacles" : [
            {
                "object": "box",
                "x": 130,
                "y": 80,
                "w": 60,
                "m": 0
            }
        ]
    },
    "3": {
        "balls": [
            {
                "x": 160,
                "y": 400
            },
            {
                "x": 485,
                "y": 400
            }
        ],
        "holes": [
            {
                "x": 160,
                "y": 100,
                "r": 15
            },
            {
                "x": 485,
                "y": 150,
                "r": 15
            }
        ],
        "obstacles" : [
            {
                "object": "box",
                "x": 245,
                "y": 300,
                "w": 30,
                "m": 0
            },
            {
                "object": "box",
                "x": 187,
                "y": 240,
                "w": 40,
                "m": 0
            },
            {
                "object": "box",
                "x": 111,
                "y": 168,
                "w": 50,
                "m": 0
            },
            {
                "object": "box",
                "x": 40,
                "y": 230,
                "w": 25,
                "m": 0
            },
            {
                "object": "box",
                "x": 240,
                "y": 60,
                "w": 40,
                "m": 0
            },
            {
                "object": "box",
                "x": 375,
                "y": 180,
                "w": 40,
                "m": 0
            },
            {
                "object": "box",
                "x": 488,
                "y": 290,
                "w": 20,
                "m": 0
            },
            {
                "object": "box",
                "x": 548,
                "y": 228,
                "w": 30,
                "m": 0
            }
        ]
    },
    "4": {
        "balls": [
            {
                "x": 180,
                "y": 50
            },
            {
                "x": 400,
                "y": 450
            }
        ],
        "holes": [
            {
                "x": 75,
                "y": 280,
                "r": 15
            },
            {
                "x": 400,
                "y": 320,
                "r": 15
            }
        ],
        "obstacles" : [
            {
                "object": "box",
                "x": 20,
                "y": 80,
                "w": 2,
                "m": 0
            },
            {
                "object": "custom",
                "x": 200,
                "y": 300,
                "r": 30,
                "vN": 8,
                "m": 0
            }
        ]
    },
    "5" :{"balls":[{"x":189,"y":453},{"x":452,"y":146}],"holes":[{"x":36,"y":294, "r": 15},{"x":452,"y":402, "r": 15}],"obstacles":[{"object":"custom","x":234,"y":99,"r":30,"vN":8,"m":0},{"object":"custom","x":92,"y":362,"r":30,"vN":8,"m":0},{"object":"custom","x":558,"y":485,"r":30,"vN":8,"m":0},{"object":"custom","x":417,"y":268,"r":30,"vN":8,"m":0}]},
    "6" :{"balls":[{"x":126,"y":378},{"x":455,"y":386}],"holes":[{"x":257,"y":260,"r":15},{"x":547,"y":91,"r":15}],"obstacles":[{"object":"box","x":181,"y":295,"w":60,"m":0},{"object":"custom","x":385,"y":208,"r":40,"vN":8,"m":0},{"object":"custom","x":517,"y":284,"r":30,"vN":8,"m":0},{"object":"box","x":49,"y":309,"w":20,"m":0},{"object":"box","x":190,"y":61,"w":50,"m":0}]}
}
`;

const LEVELS = JSON.parse(LEVELS_JSON);