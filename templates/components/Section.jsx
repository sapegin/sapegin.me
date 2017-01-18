import component from 'tamia/lib/components/component';
import s from './Section.pcss';

export default component(({ level }) => s[`level${level}`]);
