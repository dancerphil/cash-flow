import React, {useCallback, useState} from 'react';
import {Input, InputNumber, Select} from 'antd';
import logo from './logo.svg';
import c from './App.module.css';

interface Params {
    ratePercentage: number;
    gap: string;
    term: number;
    termValue: number;
}

const getIndex = ({gap}: Params) => {
    switch (gap) {
        case 'year':
            return 1;
        case 'month':
            return 1/12;
        case 'day':
            return 1/365.24;
        default:
            return 1/12;
    }
}

const computeValue = (params: Params) => {
    const {ratePercentage, term, termValue} = params;
    const rate = 1+ratePercentage/100;
    const index = getIndex(params)
    const rateOfGap = rate ** index;
    const rateBackward = 1 / rateOfGap;
    const v1 = termValue / rateBackward;
    const value = v1 * (1-rateBackward**term) / (1-rateBackward);
    return value.toFixed(2);
}

function App() {
    const [gap, setGap] = useState('month');
    const [ratePercentage, setRatePercentage] = useState(5);
    const [term, setTerm] = useState(12);
    const [termValue, setTermValue] = useState(1);

    return (
        <div className={c.container}>
            有一笔现金流，从1期后开始，每
            <Select
                value={gap}
                onChange={setGap}
                options={[{value: 'year', label: '年'}, {value: 'month', label: '月'}, {value: 'day', label: '天'}]}
            />
            获得
            <InputNumber
                value={termValue}
                onChange={(v) => {
                    if(v) {
                        setTermValue(v)
                    }
                }}
            />
            元，持续
            <InputNumber
                value={term}
                onChange={(v) => {
                    if(v) {
                        setTerm(v)
                    }
                }}
            />
            期，按贴现率
            <InputNumber
                value={ratePercentage}
                onChange={(v) => {
                    if(v) {
                        setRatePercentage(v)
                    }
                }}
            />
            %计算，这笔现金流当前价值为
            <InputNumber value={computeValue({ratePercentage, gap, term, termValue})} />
            元
        </div>
    );
}

export default App;
