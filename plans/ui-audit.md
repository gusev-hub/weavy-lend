## UI Audit — FAQ (2026-02-15)

**Scope**: `/Users/mac/Projects/weavy/components/FAQ.tsx`

| Section/Element | Problem | Type (UI/UX/a11y/code) | Risk | Priority |
|---|---|---|---|---|
| FAQ card body | Белая полоса между заголовком и контентом при раскрытии | UI | Low | High |
| FAQ open animation | Рывок из-за `height: auto` анимации | UX | Medium | High |
| FAQ color hierarchy | Слабый акцент заголовка и несогласованная гамма в раскрытой части | UI | Low | High |

**Fixes**
- Пересобран визуальный контур карточки: акцентная тёмно-зелёная шапка + более светлое зелёное тело контента.
- Убрана визуальная щель между шапкой и телом: удалён `mt`, добавлен единый разделитель в тоне карточки.
- Заменена анимация раскрытия с `AnimatePresence + height:auto` на `grid-rows` transition для более стабильного плавного раскрытия.
- Выравнены цвета текста и иконки `+/-` для лучшей контрастности и целостности стиля.
