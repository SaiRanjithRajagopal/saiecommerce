import React from 'react'
import Slider from 'rc-slider'

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const BySlider = ({ price, setPrice }) => {
    return (
        <React.Fragment>
            <Range
                marks={{
                    1: `$1`,
                    1000: `$1000`
                }}
                min={1}
                max={1000}
                defaultValue={[1, 1000]}
                tipFormatter={value => `$${value}`}
                tipProps={{ placement: "top", visible: true }}
                value={price}
                onChange={price => setPrice(price)}
            />
            <br /><br /><br />
            <hr />
        </React.Fragment>
    )
}

export default BySlider

