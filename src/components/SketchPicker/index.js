import { Form, Input } from 'antd';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';

const FormItem = Form.Item;

class ColorSimple extends React.Component {
  // 构造函数 初始化
  constructor(props) {
    super(props); // 先执行父类构造函数

    const value = this.props.value || '';
    this.state = {
      displayColorPicker: false,
      color: value.color || { r: 0, g: 0, b: 0, a: 1 },
      value: value.hex || '#000',
    };
  }

  // 接收props
  componentWillReceiveProps(nextProps) {
    // 应该是受控组件。
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState(value);
    }
  }

  // 其它操作

  handleColorClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleColorClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleColorChange = color => {
    this.setState({ color: color.rgb, hex: color.hex });
    // if (!('value' in this.props)) {
    //     this.setState({color});
    // }
    // this.setState({color});
    this.triggerChange(color.hex);
  };

  triggerChange = changeValue => {
    // console.error(changeValue);
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changeValue.hex);
      // this.props.value = changeValue.hex;
    }
  };

  // 渲染
  render() {
    const state = this.state;

    const styles = reactCSS({
      default: {
        color: {
          width: '200px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${
            this.state.color.a
          })`,
        },
        swatch: {
          padding: '5px',
          marginTop: '10px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <span>
        <Input type="hidden" value={state.value} />
        <div>
          <div style={styles.swatch} onClick={this.handleColorClick}>
            <div style={styles.color} />
          </div>
          {this.state.displayColorPicker ? (
            <div style={styles.popover}>
              <div style={styles.cover} onClick={this.handleColorClose} />
              <SketchPicker color={this.state.color} onChange={this.handleColorChange} />
            </div>
          ) : null}
        </div>
      </span>
    );
  }
}

export default ColorSimple;
