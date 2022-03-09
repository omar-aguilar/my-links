import { shallow } from 'enzyme';
import App from '../App';

describe('App', () => {
  it('should not explode', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
