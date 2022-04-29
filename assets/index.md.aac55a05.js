import{_ as n,c as s,o as a,a as t}from"./app.ff559456.js";const m='{"title":"Introduction","description":"","frontmatter":{},"headers":[{"level":2,"title":"Introduction","slug":"introduction"},{"level":2,"title":"Awesome configuration file","slug":"awesome-configuration-file"},{"level":3,"title":"Continuous integration","slug":"continuous-integration"},{"level":3,"title":"Document build","slug":"document-build"}],"relativePath":"index.md","lastUpdated":1651216513000}',p={},e=t(`<h2 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-hidden="true">#</a></h2><p>Practice GitHub Actions &amp; How to write a good actions <code>.yml</code> file.</p><h2 id="awesome-configuration-file" tabindex="-1">Awesome configuration file <a class="header-anchor" href="#awesome-configuration-file" aria-hidden="true">#</a></h2><h3 id="continuous-integration" tabindex="-1">Continuous integration <a class="header-anchor" href="#continuous-integration" aria-hidden="true">#</a></h3><div class="language-yml"><pre><code><span class="token key atrule">name</span><span class="token punctuation">:</span> CI

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token comment"># allows to manually run the job at any time.</span>
  <span class="token key atrule">workflow_dispatch</span><span class="token punctuation">:</span>
  
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;**&#39;</span>
    <span class="token comment"># should excluding some file and dir, because the actions caused by these files are unnecessary.</span>
    <span class="token key atrule">paths-ignore</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;**.md&#39;</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;docs/**&#39;</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">Runner</span><span class="token punctuation">:</span>
    <span class="token key atrule">timeout-minutes</span><span class="token punctuation">:</span> <span class="token number">10</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> matrix.os <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token key atrule">strategy</span><span class="token punctuation">:</span>
      <span class="token key atrule">fail-fast</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
      <span class="token key atrule">matrix</span><span class="token punctuation">:</span>
        <span class="token key atrule">os</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> ubuntu<span class="token punctuation">-</span>latest<span class="token punctuation">,</span> macOs<span class="token punctuation">-</span>latest <span class="token punctuation">]</span>
        <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">,</span> <span class="token number">16</span> <span class="token punctuation">]</span>
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Checkout Git Source
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v3

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Setup Node.js
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v3
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> matrix.node<span class="token punctuation">-</span>version <span class="token punctuation">}</span><span class="token punctuation">}</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install dependencies
        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
          npm i npm@6 -g
          npm i</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Continuous integration
        <span class="token key atrule">run</span><span class="token punctuation">:</span> npm run ci

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Code coverage
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> codecov/codecov<span class="token punctuation">-</span>action@v3.0.0
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">token</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.CODECOV_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre></div><h3 id="document-build" tabindex="-1">Document build <a class="header-anchor" href="#document-build" aria-hidden="true">#</a></h3><div class="language-yml"><pre><code><span class="token key atrule">name</span><span class="token punctuation">:</span> Docs Build

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token comment"># allows to manually run the job at any time.</span>
  <span class="token key atrule">workflow_dispatch</span><span class="token punctuation">:</span>
  
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> main
    <span class="token comment"># only execute when docs/** was modified.</span>
    <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&#39;docs/**&#39;</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">docs-build</span><span class="token punctuation">:</span>
    <span class="token key atrule">timeout-minutes</span><span class="token punctuation">:</span> <span class="token number">10</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest

    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Checkout Git Source
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v3

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Setup Node.js
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v3
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token string">&#39;16&#39;</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install dependencies
        <span class="token key atrule">run</span><span class="token punctuation">:</span> npm install $<span class="token punctuation">{</span>docs build tool<span class="token punctuation">}</span> <span class="token punctuation">-</span>D

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build docs
        <span class="token key atrule">run</span><span class="token punctuation">:</span> npm run docs<span class="token punctuation">:</span>build

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy to GitHub Pages
        <span class="token key atrule">if</span><span class="token punctuation">:</span> success()
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> peaceiris/actions<span class="token punctuation">-</span>gh<span class="token punctuation">-</span>pages@v3
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">github_token</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.GITHUB_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">publish_dir</span><span class="token punctuation">:</span> ./docs
</code></pre></div><p>WIP ...</p>`,8),o=[e];function c(u,l,i,k,r,d){return a(),s("div",null,o)}var h=n(p,[["render",c]]);export{m as __pageData,h as default};
