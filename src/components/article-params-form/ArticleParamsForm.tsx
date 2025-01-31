import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';

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
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={props.articleState.fontFamilyOption}
						title={'шрифт'}
					/>
					<RadioGroup
						name='fontSizeOptions'
						options={fontSizeOptions}
						selected={props.articleState.fontSizeOption}
						title={'размер шрифта'}
					/>
					<Select
						options={fontColors}
						selected={props.articleState.fontColor}
						title={'цвет шрифта'}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={props.articleState.backgroundColor}
						title={'цвет фона'}
					/>
					<Select
						options={contentWidthArr}
						selected={props.articleState.contentWidth}
						title={'ширина контента'}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
