---
type: "{{itemType}}"{% for type, creators in creators | groupby("creatorType") -%}{% if loop.first %}
{% endif %}{{type | replace("interviewee", "author") | replace("director", "author") | replace("presenter", "author") | replace("podcaster", "author") | replace("programmer", "author") | replace("cartographer", "author") | replace("inventor", "author") | replace("sponsor", "author")  | replace("performer", "author") | replace("artist", "author")}}: "{%- for creator in creators -%}{%- if creator.name %}{{creator.name}}{%- else %}{{creator.lastName}}, {{creator.firstName}}{%- endif %}{% if not loop.last %}; {% endif %}{% endfor %}"{% if not loop.last %}
{% endif %}{%- endfor %}{% if title %}
title: "{{title}}"{% endif %}{% if publicationTitle %}
publication: "{{publicationTitle}}"{% endif %}{% if date %}
date: {{date | format("YYYY-MM-DD")}}{% endif %}{% if archive %}
archive: "{{archive}}"{% endif %}{% if archiveLocation %}
archive-location: "{{archiveLocation}}"{% endif %}
citekey: {{citekey}}
---
{{bibliography}}
[online]({{uri}}) [local]({{desktopURI}}) {%- for attachment in attachments | filterby("path", "endswith", ".pdf") %} [pdf](file://{{attachment.path | replace(" ", "%20")}})
{%- endfor -%}
 
{% if tags.length > 0 -%}{% for t in tags -%}{% if t.tag == "secondary" %}

#source/secondary{% elif t.tag == "primary" %}

#source/primary{% elif "-project" in t.tag %}
#project/{{t.tag | replace("-project", "")}}{% endif %}{%- endfor %}{%- endif %}

### Index

start-date:: {% if date %}{{date | format("YYYY-MM-DD")}}{% endif %}
end-date::
page-no::

### Connections

comment:: 

### Note
{%- for annotation in annotations %}
{% if annotation.imageRelativePath %}
![[{{annotation.imageRelativePath}}]] {% endif %}{% if annotation.annotatedText %}
{{annotation.annotatedText}} [(p. {{annotation.page}})](zotero://open-pdf/library/items/{{annotation.attachment.itemKey}}?page={{annotation.page}}&annotation={{annotation.id}}){%- endif %}{%- if annotation.comment%}
%%{{annotation.comment}}%%{%- endif %}{%- endfor %}