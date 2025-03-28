import React from 'react';
import DOMPurify from 'dompurify';

function PageContent({ content }) {
    if (!content) return null;

    const containsHTML = (text) => /<\/?[a-z][\s\S]*>/i.test(text);

    return (
        <div className="page-content">
            <h1 className="text-2xl mb-4">{content.title}</h1>
            {content.description && <p>{content.description}</p>}

            {content.sections && content.sections.map((section, index) => (
                <div key={index} className="mt-4">
                    {section.title && <p className="font-medium">{section.title}</p>}
                    {section.text && (
                        containsHTML(section.text) ? (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(section.text),
                                }}
                            />
                        ) : (
                            <p className="mt-2">{section.text}</p>
                        )
                    )}

                    {section.type === 'list' && section.items && (
                        <ul className="list-disc ml-5 mt-2">
                            {section.items.map((item, itemIndex) => (
                                <li key={itemIndex}>{item}</li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
}

export default PageContent;
