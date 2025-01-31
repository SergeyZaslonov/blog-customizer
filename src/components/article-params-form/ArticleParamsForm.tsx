import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useState } from 'react';
import { ArticleStateType } from 'src/constants/articleProps';

type ArticleParamsProps = {
	articleState: ArticleStateType;
	setArticleState: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsProps) => {
	const [isOpen, setOpen] = useState(false);
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
