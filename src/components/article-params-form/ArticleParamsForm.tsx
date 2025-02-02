import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useLayoutEffect, useRef, useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
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
	const [selectedState, setSelectedState] = useState(props.articleState);
	const refAside = useRef<HTMLElement>(null);

	const onSelectionChanged = (
		articleStateKey: keyof ArticleStateType,
		selected: OptionType
	) => {
		setSelectedState((prevState) => ({
			...prevState,
			[articleStateKey]: selected,
		}));
	};

	const onResetClick = () => {
		setSelectedState(defaultArticleState);
		props.setArticleState(defaultArticleState);
	};

	const onMouseDownOutside = (event: MouseEvent) => {
		if (refAside.current && !refAside.current.contains(event.target as Node)) {
			setOpen(false);
		}
	};

	useLayoutEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', onMouseDownOutside);
		}
		return () => {
			document.removeEventListener('mousedown', onMouseDownOutside);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setOpen(!isOpen)} />
			<aside
				ref={refAside}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={(event) => {
						event.preventDefault();
						props.setArticleState(selectedState);
					}}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={selectedState.fontFamilyOption}
						title={'шрифт'}
						onChange={(selected) =>
							onSelectionChanged('fontFamilyOption', selected)
						}
					/>
					<RadioGroup
						name='fontSizeOptions'
						options={fontSizeOptions}
						selected={selectedState.fontSizeOption}
						title={'размер шрифта'}
						onChange={(selected) =>
							onSelectionChanged('fontSizeOption', selected)
						}
					/>
					<Select
						options={fontColors}
						selected={selectedState.fontColor}
						title={'цвет шрифта'}
						onChange={(selected) => onSelectionChanged('fontColor', selected)}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={selectedState.backgroundColor}
						title={'цвет фона'}
						onChange={(selected) =>
							onSelectionChanged('backgroundColor', selected)
						}
					/>
					<Select
						options={contentWidthArr}
						selected={selectedState.contentWidth}
						title={'ширина контента'}
						onChange={(selected) =>
							onSelectionChanged('contentWidth', selected)
						}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={onResetClick}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
