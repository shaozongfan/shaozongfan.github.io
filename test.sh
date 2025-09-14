#!/usr/bin/env bash
# �޸� Docusaurus �� Markdown �ļ����󱻵��� JSX �ļ�����
# �÷���bash fix-jsx-tags.sh

set -euo pipefail

# ��Ҫת��ġ���ǩ���б�key=ԭʼ value=ת���
declare -A map=(
  ["<kernel-version>"]="&lt;kernel-version&gt;"
  ["<model>"]="&lt;model&gt;"
  ["<manufacturer>"]="&lt;manufacturer&gt;"
  ["<linenum>"]="&lt;linenum&gt;"
  ["<port>"]="&lt;port&gt;"
  ["<host_ip>"]="&lt;host_ip&gt;"
  ["<addr>"]="&lt;addr&gt;"
  ["<size>"]="&lt;size&gt;"
)

# �ж� sed �﷨
if [[ "$OSTYPE" == "darwin"* ]]; then
  SED="sed -i ''"
else
  SED="sed -i"
fi

# �ҳ����� md �ļ�
mapfile -t files < <(find . -type f -name "*.md")
if ((${#files[@]} == 0)); then
  echo "δ�ҵ� docs/ �µ� .md �ļ����ű��˳�"
  exit 0
fi

echo "�������������ļ���"
printf '  %s\n' "${files[@]}"
read -rp "ȷ�ϼ�����(y/N) " confirm
[[ "$confirm" != [yY] ]] && echo "��ȡ��" && exit 0

# ��ʼ�滻
for f in "${files[@]}"; do
  for key in "${!map[@]}"; do
    $SED "s|$key|${map[$key]}|g" "$f"
  done
done

echo "�޸���ɣ�"