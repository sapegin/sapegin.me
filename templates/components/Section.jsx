import component from 'tamia/src/components/component';
import s from './Section.pcss';

export default component(({ level }) => s[`level${level}`]);
