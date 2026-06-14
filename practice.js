function parseCode(input) {
    const numbers = input.match(/\d+/g);

    if(!numbers) {
        return null;
    }

    return {
        cabinetID: Number(numbers[0]),
        shelf: numbers[1] ? Number(numbers[1]) : null,
        sequence: numbers[2] ? Number(numbers[2]) : null,
    };
}


const cabinets = [
    { id: 150, floor: 2, area: "二层上方货架区"},
    { id: 9, floor: 1, area: "一层入口附近"},
];

function findCabinet(code) {
    const parsed = parseCode(code);

    if(!parsed) {
        return "输入无效";
    }

    const cabinet = cabinets.find(item => item.id === parsed.cabinetID);

    if(!cabinet) {
        return "没有找到这个货柜";
    }

    return `货柜 ${cabinet.id} 在 ${cabinet.floor} 楼, 位置 : ${cabinet.area}`;
}

console.log(findCabinet("150-2-88"));
console.log(findCabinet("999-2-88"));
