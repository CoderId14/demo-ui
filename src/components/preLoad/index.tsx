import { Spin } from 'antd'
import classNames from 'classnames/bind'
import styles from './preLoad.module.scss'

const cx = classNames.bind(styles)

interface Props {
  size?: 'small' | 'default' | 'large'
}

const PreLoad: React.FC<Props> = ({ size }: Props) => (
  <div className={cx('example')}>
    <Spin size={size} />
  </div>
)

export default PreLoad
