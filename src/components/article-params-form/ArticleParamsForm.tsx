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
	OptionType,
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
	const [selectedState,setSelectedState] = useState(props.articleState);

	const onSelectionChanged=(articleStateKey:keyof ArticleStateType, selected: OptionType) => {
		console.log(articleStateKey)
		setSelectedState((prevState) => ({...prevState, [articleStateKey]: selected }));
	}

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
						selected={selectedState.fontFamilyOption}
						title={'шрифт'}
						onChange={(selected) => onSelectionChanged('fontFamilyOption',selected) }
					/>
					<RadioGroup
						name='fontSizeOptions'
						options={fontSizeOptions}
						selected={selectedState.fontSizeOption}
						title={'размер шрифта'}
						onChange={(selected) => onSelectionChanged('fontSizeOption',selected) }
					/>
					<Select
						options={fontColors}
						selected={selectedState.fontColor}
						title={'цвет шрифта'}
						onChange={(selected) => onSelectionChanged('fontColor',selected) }
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={selectedState.backgroundColor}
						title={'цвет фона'}
						onChange={(selected) => onSelectionChanged('backgroundColor',selected) }
					/>
					<Select
						options={contentWidthArr}
						selected={selectedState.contentWidth}
						title={'ширина контента'}
						onChange={(selected) => onSelectionChanged('contentWidth',selected) }
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
