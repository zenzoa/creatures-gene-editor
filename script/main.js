const { h, render, Component } = preact

/* UTILITY FUNCTIONS */

let etcTable = [
    { mutable: 0, duplicable: 0, deletable: 0, sexdependence: 0 },
    { mutable: 1, duplicable: 0, deletable: 0, sexdependence: 0 },
    { mutable: 0, duplicable: 1, deletable: 0, sexdependence: 0 },
    { mutable: 1, duplicable: 1, deletable: 0, sexdependence: 0 },
    { mutable: 0, duplicable: 0, deletable: 1, sexdependence: 0 },
    { mutable: 1, duplicable: 0, deletable: 1, sexdependence: 0 },
    { mutable: 0, duplicable: 1, deletable: 1, sexdependence: 0 },
    { mutable: 1, duplicable: 1, deletable: 1, sexdependence: 0 },
    { mutable: 0, duplicable: 0, deletable: 0, sexdependence: 1 },
    { mutable: 1, duplicable: 0, deletable: 0, sexdependence: 1 },
    { mutable: 0, duplicable: 1, deletable: 0, sexdependence: 1 },
    { mutable: 1, duplicable: 1, deletable: 0, sexdependence: 1 },
    { mutable: 0, duplicable: 0, deletable: 1, sexdependence: 1 },
    { mutable: 1, duplicable: 0, deletable: 1, sexdependence: 1 },
    { mutable: 0, duplicable: 1, deletable: 1, sexdependence: 1 },
    { mutable: 1, duplicable: 1, deletable: 1, sexdependence: 1 },
    { mutable: 0, duplicable: 0, deletable: 0, sexdependence: 2 },
    { mutable: 1, duplicable: 0, deletable: 0, sexdependence: 2 },
    { mutable: 0, duplicable: 1, deletable: 0, sexdependence: 2 },
    { mutable: 1, duplicable: 1, deletable: 0, sexdependence: 2 },
    { mutable: 0, duplicable: 0, deletable: 1, sexdependence: 2 },
    { mutable: 1, duplicable: 0, deletable: 1, sexdependence: 2 },
    { mutable: 0, duplicable: 1, deletable: 1, sexdependence: 2 },
    { mutable: 1, duplicable: 1, deletable: 1, sexdependence: 2 }
]

const parseHeader = (data) => {
    let geneType = data[4]
    let geneSubtype = data[5]
    let geneNumber = data[6]
    let duplicate = data[7]
    let switchOnTime = data[8]
    let etc = etcTable[data[9]]
    return {
        geneType,
        geneSubtype,
        geneNumber,
        duplicate,
        switchOnTime,
        mutable: etc.mutable,
        duplicable: etc.duplicable,
        deletable: etc.deletable,
        sexdependence: etc.sexdependence
    }
}

const encodeHeader = (gene) => {
    let etc = 0
    etcTable.forEach((v, i) => {
        if (v.mutable === gene.mutable &&
            v.duplicable === gene.duplicable &&
            v.deletable === gene.deletable &&
            v.sexdependence === gene.sexdependence
        ) {
            etc = i
        }
    })
    return [0x67, 0x65, 0x6E, 0x65, gene.geneType, gene.geneSubtype, gene.geneNumber, gene.duplicate, gene.switchOnTime, etc]
}

const parseLobe = (data) => {
    return {
        type: 'lobe',
        data: Array.from(data)
    }
}

const encodeLobe = (gene) => {
    return gene.data
}

const parseReceptor = (data) => {
    return {
        type: 'receptor',
        data: Array.from(data)
    }
}

const encodeReceptor = (gene) => {
    return gene.data
}

const parseEmitter = (data) => {
    return {
        type: 'emitter',
        data: Array.from(data)
    }
}

const encodeEmitter = (gene) => {
    return gene.data
}

const parseReaction = (data) => {
    return {
        type: 'reaction',
        data: Array.from(data)
    }
}

const encodeReaction = (gene) => {
    return gene.data
}

const parseHalfLives = (data) => {
    return {
        type: 'halflives',
        data: Array.from(data)
    }
}

const encodeHalfLives = (gene) => {
    return gene.data
}

const parseInitialConcentration = (data) => {
    return {
        type: 'initialconcentration',
        data: Array.from(data)
    }
}

const encodeInitialConcentrations = (gene) => {
    return gene.data
}

const parseStimulus = (data) => {
    return {
        type: 'stimulus',
        data: Array.from(data)
    }
}

const encodeStimulus = (gene) => {
    return gene.data
}

const parseGenus = (data) => {
    return {
        type: 'genus',
        data: Array.from(data)
    }
}

const encodeGenus = (gene) => {
    return gene.data
}

const parseAppearance = (data) => {
    return {
        type: 'appearance',
        bodytype: data[0],
        breed: data[1]
    }
}

const encodeAppearance = (gene) => {
    return [
        gene.bodytype,
        gene.breed
    ]
}

const parsePose = (data) => {
    return {
        type: 'pose',
        data: Array.from(data)
    }
}

const encodePose = (gene) => {
    return gene.data
}

const parseGait = (data) => {
    return {
        type: 'gait',
        data: Array.from(data)
    }
}

const encodeGait = (gene) => {
    return gene.data
}

const parseInstinct = (data) => {
    return {
        type: 'instinct',
        data: Array.from(data)
    }
}

const encodeInstinct = (gene) => {
    return gene.data
}

const parsePigment = (data) => {
    return {
        type: 'pigment',
        data: Array.from(data)
    }
}

const encodePigment = (gene) => {
    return gene.data
}

const parseGenome = (data) => {
    let genomeData = []

    let i = 0
    while (i < data.length - 4) {
        if (data[i] === 0x67 && data[i+1] === 0x65 && data[i+2] === 0x6E && data[i+3] === 0x65) {
            let headerData = parseHeader(data.slice(i, i + 10))
            i += 10
            let geneData = null
            if (headerData.geneType === 0 && headerData.geneSubtype === 0) {
                geneData = parseLobe(data.slice(i, i + 112))
                i += 112
            } else if (headerData.geneType === 1 && headerData.geneSubtype === 0) {
                geneData = parseReceptor(data.slice(i, i + 8))
                i += 8
            } else if (headerData.geneType === 1 && headerData.geneSubtype === 1) {
                geneData = parseEmitter(data.slice(i, i + 8))
                i += 8
            } else if (headerData.geneType === 1 && headerData.geneSubtype === 2) {
                geneData = parseReaction(data.slice(i, i + 9))
                i += 9
            } else if (headerData.geneType === 1 && headerData.geneSubtype === 3) {
                geneData = parseHalfLives(data.slice(i, i + 256))
                i += 256
            } else if (headerData.geneType === 1 && headerData.geneSubtype === 4) {
                geneData = parseInitialConcentration(data.slice(i, i + 2))
                i += 2
            } else if (headerData.geneType === 2 && headerData.geneSubtype === 0) {
                geneData = parseStimulus(data.slice(i, i + 13))
                i += 13
            } else if (headerData.geneType === 2 && headerData.geneSubtype === 1) {
                geneData = parseGenus(data.slice(i, i + 9))
                i += 9
            } else if (headerData.geneType === 2 && headerData.geneSubtype === 2) {
                geneData = parseAppearance(data.slice(i, i + 2))
                i += 2
            } else if (headerData.geneType === 2 && headerData.geneSubtype === 3) {
                geneData = parsePose(data.slice(i, i + 16))
                i += 16
            } else if (headerData.geneType === 2 && headerData.geneSubtype === 4) {
                geneData = parseGait(data.slice(i, i + 9))
                i += 9
            } else if (headerData.geneType === 2 && headerData.geneSubtype === 5) {
                geneData = parseInstinct(data.slice(i, i + 9))
                i += 9
            } else if (headerData.geneType === 2 && headerData.geneSubtype === 6) {
                geneData = parsePigment(data.slice(i, i + 2))
                i += 2
            }
            if (geneData) {
                geneData.index = genomeData.length
                geneData.geneType = headerData.geneType
                geneData.geneSubtype = headerData.geneSubtype
                geneData.geneNumber = headerData.geneNumber
                geneData.duplicate = headerData.duplicate
                geneData.switchOnTime = headerData.switchOnTime
                geneData.mutable = headerData.mutable
                geneData.duplicable = headerData.duplicable
                geneData.deletable = headerData.deletable
                geneData.sexdependence = headerData.sexdependence
                genomeData.push(geneData)
            } else {
                console.log('ERROR: invalid gene type at byte ' + i)
                i++
            }
        } else if (data[i] === 0x67 && data[i+1] === 0x65 && data[i+2] === 0x6E && data[i+3] === 0x64) {
            break
        } else {
            console.log('ERROR: unable to parse data as gene at byte ' + i)
            i++
        }
    }

    window.genomeData = genomeData

    return genomeData
}

const encodeGenome = (genomeData) => {
    let data = []

    genomeData.forEach(gene => {
        let encoder = ({
            'lobe': encodeLobe,
            'receptor': encodeReceptor,
            'emitter': encodeEmitter,
            'reaction': encodeReaction,
            'halflives': encodeHalfLives,
            'initialconcentration': encodeInitialConcentrations,
            'stimulus': encodeStimulus,
            'genus': encodeGenus,
            'appearance': encodeAppearance,
            'pose': encodePose,
            'gait': encodeGait,
            'instinct': encodeInstinct,
            'pigment': encodePigment
        })[gene.type]
        let geneData = encodeHeader(gene).concat(encoder(gene))
        data = data.concat(geneData)
    })

    data = data.concat([0x67, 0x65, 0x6E, 0x64])

    return data
}

const getFileData = (event, callback) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()

    reader.addEventListener('load', () => {

        const result = reader.result
        const header = 'data:application/octet-stream;base64,'
        const base64Data = result.slice(header.length)
        const binaryData = window.atob(base64Data)
        const binaryLength = binaryData.length

        let byteArray = new Uint8Array(new ArrayBuffer(binaryLength))
        for (let i = 0; i < binaryLength; i++) {
            byteArray[i] = binaryData.charCodeAt(i);
        }

        callback(byteArray)

    }, false)

    reader.readAsDataURL(file)
}

/* INPUT COMPONENTS */

class NumberInput extends Component {
    render({ value, length, onUpdate }) {
        return h('input', { value: value })
    }
}

class DropdownInput extends Component {
    render({ gene, genePart, onUpdate, dropdownOptions }) {
        return h('select', { value: gene[genePart], onChange: e => onUpdate({ index: gene.index, genePart, value: e.target.value }) },
            dropdownOptions.map((dropdownOption, i) =>
                h('option', { value: i }, dropdownOption)
            )
        )
    }
}

/* GENE TYPE COMPONENTS */

class GeneHeader extends Component {
    render({ gene, onUpdate }) {
        return h('div', { className: 'gene-part' }, [
            h('span', null, 'is duplicate'),
            h(DropdownInput, { gene, genePart: 'duplicate', onUpdate, dropdownOptions: ['false', 'true'] }),
            h('span', null, 'switch-on time'),
            h(DropdownInput, { gene, genePart: 'switchOnTime', onUpdate, dropdownOptions: ['embryo', 'baby', 'child', 'adolescent', 'youth', 'adult', 'old'] }),
            h('span', null, 'mutable'),
            h(DropdownInput, { gene, genePart: 'mutable', onUpdate, dropdownOptions: ['false', 'true'] }),
            h('span', null, 'duplicable'),
            h(DropdownInput, { gene, genePart: 'duplicable', onUpdate, dropdownOptions: ['false', 'true'] }),
            h('span', null, 'deletable'),
            h(DropdownInput, { gene, genePart: 'deletable', onUpdate, dropdownOptions: ['false', 'true'] }),
            h('span', null, 'sex dependence'),
            h(DropdownInput, { gene, genePart: 'sexdependence', onUpdate, dropdownOptions: ['none', 'male', 'female'] })
        ])
    }
}

class AppearanceGene extends Component {
    render({ gene, onUpdate }) {
        return h('div', { className: 'gene' }, [
            // h(GeneHeader, { gene, onUpdate }),
            h(GenePart, {
                gene,
                genePart: 'bodytype',
                inputType: DropdownInput,
                onUpdate,
                dropdownOptions: ['head', 'body', 'legs', 'arms']
            }),
            h(GenePart, {
                gene,
                genePart: 'breed',
                inputType: DropdownInput,
                onUpdate,
                dropdownOptions: ['0 - bald', '1 - pixie', '2 - horse', '3 - santa 96', '4 - purple mountain', '5 - forest', '6 - ron', '7 - santa 97', '8', '9']
            }),
        ])
    }
}

/* GENE COMPONENTS */

class GenePart extends Component {
    render({ gene, genePart, inputType, onUpdate, dropdownOptions }) {
        return h('div', { className: 'gene-part' }, [
            h('div', { className: 'gene-part-name' }, genePart),
            h('div', { className: 'gene-part-value' },
                h(inputType, { gene, genePart, onUpdate, dropdownOptions })
            )
        ])
    }
}

class GeneType extends Component {
    state = { isOpen: true }

    onToggle = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    render({ geneType, geneList, onUpdate }, { isOpen }) {

        let geneComponents = {
            'appearance': AppearanceGene
        }

        if (isOpen) {
            return h('div', { className: 'gene-type open' }, [
                h('h3', { onClick: this.onToggle }, geneType),
                h('div', { className: 'gene-list' },
                    geneList.map(gene => {
                        if (geneComponents[geneType]) {
                            return h(geneComponents[geneType], { gene, onUpdate })
                        }
                    })
                )
            ])
        } else {
            return h('div', { className: 'gene-type closed' }, [
                h('h3', { onClick: this.onToggle }, geneType),
            ])
        }
    }
}

class GeneList extends Component {

    render({ genomeData, onUpdate }) {
        if (!genomeData) return null

        let geneLists = {
            // 'lobe': [],
            // 'receptor': [],
            // 'emitter': [],
            // 'reaction': [],
            // 'halflives': [],
            // 'initialconcentration': [],
            // 'stimulus': [],
            // 'genus': [],
            'appearance': [],
            // 'pose': [],
            // 'gait': [],
            // 'instinct': [],
            // 'pigment': []
        }
        
        genomeData.forEach(gene => {
            if (geneLists[gene.type]) {
                geneLists[gene.type].push(gene)
            }
        })

        return h('div', { className: 'gene-type-list' },
            Object.keys(geneLists).map(geneType =>
                h(GeneType, { geneType, geneList: geneLists[geneType], onUpdate })
            )
        )
    }

}

class GenomeUploadDownload extends Component {

    render({ showDownload, onUpload, onDownload }) {
        return h('div', { className: 'genome-uploader' }, [
            h('label', null, [
                h('input', { type: 'file', onchange: onUpload }),
                h('span', null, 'Upload a GEN file')
            ]),
            showDownload ? h('span', null, '|') : null,
            showDownload ? h('a', { href: '#', onClick: onDownload }, 'Download this genome') : null
        ])
    }

}

class GenomeEditor extends Component {
    state = { genomeData: null }

    onUpdate = ({ index, genePart, value }) => {
        let newGene = {}
        Object.keys(this.state.genomeData[index]).forEach(key => {
            newGene[key] = this.state.genomeData[index][key]
        })
        newGene[genePart] = parseInt(value)

        let newGenomeData = this.state.genomeData.slice()
        newGenomeData[index] = newGene

        this.setState({ genomeData: newGenomeData })
    }

    onUpload = (event) => {
        const file = event.target.files[0]
        if (!file) return

        const reader = new FileReader()

        reader.addEventListener('load', () => {

            const result = reader.result
            const header = 'data:application/octet-stream;base64,'
            const base64Data = result.slice(header.length)
            const binaryData = window.atob(base64Data)
            const binaryLength = binaryData.length

            let data = new Uint8Array(new ArrayBuffer(binaryLength))
            for (let i = 0; i < binaryLength; i++) {
                data[i] = binaryData.charCodeAt(i);
            }

            const genomeData = parseGenome(data)
            this.setState({ genomeData })

        }, false)

        reader.readAsDataURL(file)
    }

    onDownload = () => {
        let data = encodeGenome(this.state.genomeData)
        let unicodeArray = new Uint8Array(data)
        let blob = new Blob([unicodeArray.buffer])
        let blobURL = URL.createObjectURL(blob)

        let downloadLink = document.createElement('a')
        downloadLink.download = 'gene.gen'
        downloadLink.href = blobURL
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
        
    }

    render(_, { genomeData }) {
        return h('div', { className: 'genome-editor' }, [

            h('header', null, [
                h('h1', null, 'Creatures Gene Editor'),
                h('h2', null, 'Edit genomes for ', h('a', { href: 'https://creatures.wiki/Creatures' }, 'Creatures 1'))
            ]),

            h(GenomeUploadDownload, {
                showDownload: genomeData != null,
                onUpload: this.onUpload,
                onDownload: this.onDownload
            }),

            h(GeneList, {
                genomeData,
                onUpdate: this.onUpdate
            }),

            h('footer', null, [
                'by ', h('a', { href: 'https://zenzoa.com' }, 'SG'), ' :: source on ', h('a', { href: 'https://github.com/zenzoa/' }, 'GitHub')
            ])

        ])
    }

}

/* SETUP */

window.onload = () => {

    render(
        h(GenomeEditor),
        document.getElementsByTagName('main')[0]
    )

}