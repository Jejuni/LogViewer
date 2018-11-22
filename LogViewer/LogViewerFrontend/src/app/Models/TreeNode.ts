export class TreeNode {
    public children: TreeNode[];
    public displayName: string;
    public potentialValue: string;

    public hasChildren() {
        return this.children && this.children.length !== 0;
    }
}
