// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: '蒲城小农的文字世界',
    tagline: '蒲城小农',
    url: 'https://shaozongfan.github.io',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // search plugins
    plugins: [
        [
            require.resolve("@cmfcmf/docusaurus-search-local"),
            {
                // Options here
                // whether to index docs pages
                indexDocs: true,
                indexDocSidebarParentCategories: 0,

                // whether to index blog pages
                indexBlog: true,

                // whether to index static pages
                // /404.html is never indexed
                indexPages: false,

                // language of your documentation, see next section
                language: "zh",

                // setting this to "none" will prevent the default CSS to be included. The default CSS
                // comes from autocomplete-theme-classic, which you can read more about here:
                // https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-theme-classic/
                // When you want to overwrite CSS variables defined by the default theme, make sure to suffix your
                // overwrites with `!important`, because they might otherwise not be applied as expected. See the
                // following comment for more information: https://github.com/cmfcmf/docusaurus-search-local/issues/107#issuecomment-1119831938.
                style: undefined,

                // The maximum number of search results shown to the user. This does _not_ affect performance of
                // searches, but simply does not display additional search results that have been found.
                maxSearchResults: 8,

                // lunr.js-specific settings
                lunr: {
                    // When indexing your documents, their content is split into "tokens".
                    // Text entered into the search box is also tokenized.
                    // This setting configures the separator used to determine where to split the text into tokens.
                    // By default, it splits the text at whitespace and dashes.
                    //
                    // Note: Does not work for "ja" and "th" languages, since these use a different tokenizer.
                    tokenizerSeparator: /[\s\-]+/,
                    // https://lunrjs.com/guides/customising.html#similarity-tuning
                    //
                    // This parameter controls the importance given to the length of a document and its fields. This
                    // value must be between 0 and 1, and by default it has a value of 0.75. Reducing this value
                    // reduces the effect of different length documents on a term’s importance to that document.
                    b: 0.75,
                    // This controls how quickly the boost given by a common word reaches saturation. Increasing it
                    // will slow down the rate of saturation and lower values result in quicker saturation. The
                    // default value is 1.2. If the collection of documents being indexed have high occurrences
                    // of words that are not covered by a stop word filter, these words can quickly dominate any
                    // similarity calculation. In these cases, this value can be reduced to get more balanced results.
                    k1: 1.2,
                    // By default, we rank pages where the search term appears in the title higher than pages where
                    // the search term appears in just the text. This is done by "boosting" title matches with a
                    // higher value than content matches. The concrete boosting behavior can be controlled by changing
                    // the following settings.
                    titleBoost: 5,
                    contentBoost: 1,
                    tagsBoost: 3,
                    parentCategoriesBoost: 2, // Only used when indexDocSidebarParentCategories > 0
                }
            },
        ],
    ],

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'shaozongfan', // Usually your GitHub org/user name.
    projectName: 'shaozongfan.github.io', // Usually your repo name.
    deploymentBranch: 'gh-pages', // set default deployment branch
    trailingSlash: false,
    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'zh-Hans',
        locales: ['zh-Hans'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    //routeBasePath: '/',
                    //routeBasePath: '/docs',
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                    'https://github.com/shaozongfan/shaozongfan.github.io',
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                    'https://github.com/shaozongfan/shaozongfan.github.io',
                    blogTitle: '蒲城小农的博客',
                    blogDescription: '美好的时光在文字中停滞不前',
                    blogSidebarCount: 'ALL',
                    blogSidebarTitle: '历史发布',
                    routeBasePath: 'blog',
                    include: ['**/*.{md,mdx}'],
                    postsPerPage: 10,
                    blogListComponent: '@theme/BlogListPage',
                    blogPostComponent: '@theme/BlogPostPage',
                    blogTagsListComponent: '@theme/BlogTagsListPage',
                    blogTagsPostsComponent: '@theme/BlogTagsPostsPage',
                    rehypePlugins: [],
                    beforeDefaultRemarkPlugins: [],
                    beforeDefaultRehypePlugins: [],
                    truncateMarker: /<!--\s*(truncate)\s*-->/,
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    (
      {
         metadata: [
      {name: 'charset', content: 'UTF-8'},
    ],},
      {
        navbar: {
            title: '蒲城小农的文字世界',
            logo: {
                alt: 'My Site Logo',
                src: 'img/logo.svg',
            },
            items: [
                {to: '/blog', label: 'Blog', position: 'left'},
                {
                    href: 'https://github.com/shaozongfan',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    //title: 'Community',
                    items: [
                        {
                            label: 'shaozongfan',
                            href: 'https://github.com/shaozongfan',
                        }
                    ],
                },
                {
                    title: 'More',
                    items: [
                        {
                            label: 'Blog',
                            to: '/blog',
                        },
                        {
                            label: 'GitHub',
                            href: 'https://github.com/shaozongfan',
                        },
                    ],
                },
            ],
            copyright: `Copyright ? ${new Date().getFullYear()} 蒲城小农的文字世界, Inc. Built with Docusaurus.`,
        },
        prism: {
            theme: lightCodeTheme,
            darkTheme: darkCodeTheme,
        },
    }),
};

module.exports = config;