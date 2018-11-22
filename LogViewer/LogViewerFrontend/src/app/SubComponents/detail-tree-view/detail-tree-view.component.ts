import { Component, OnInit, Input } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { TreeNode } from '../../Models/TreeNode';
import { TreeParserService } from '../../Services/tree-parser.service';

@Component({
  selector: 'app-detail-tree-view',
  templateUrl: './detail-tree-view.component.html',
  styleUrls: ['./detail-tree-view.component.scss']
})
export class DetailTreeViewComponent implements OnInit {
  nestedTreeControl: NestedTreeControl<TreeNode>;
  nestedDataSource: MatTreeNestedDataSource<TreeNode>;

  constructor(private treeParser: TreeParserService) { }

  @Input() jsonString: string;
  public hasTreeToRender: boolean;

  ngOnInit() {
    if (!this.jsonString) {
      this.hasTreeToRender = false;
      return;
    }

    this.hasTreeToRender = true;
    this.nestedTreeControl = new NestedTreeControl<TreeNode>(tN => tN.children);
    this.nestedDataSource = new MatTreeNestedDataSource<TreeNode>();
    this.treeParser.buildTreeFromStringifiedObject(this.jsonString).subscribe(data => this.nestedDataSource.data = data);
  }

  public hasChild = (_: number, nodeData: TreeNode) => nodeData.hasChildren();
}
