import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { courseResolver } from '../services/course.resolver';

//! questo modello del il mio nodo Nested Tree
interface CourseNode {
  name: string;
  children?: CourseNode[];
}

//! model for Flat Tree
interface CourseFlatNode {
  name: string;
  expandable: boolean;//! true i nodi nidificati , false i nodi foglia
  level: number; //! stabilisce il rientro di cui abbiamo bisogno
}


const TREE_DATA: CourseNode[] = [
  {
    name: 'Angular For Beginners',
    children: [
      {
        name: 'Introduction to Angular'
      },
      {
        name: 'Angular Component @Input()'
      },
      {
        name: 'Angular Component @Output()'
      }
    ],
  },
  {
    name: 'Angular Material In Depth',
    children: [
      {
        name: 'Introduction to Angular Material',
        children: [
          {
            name: 'Form Components'
          },
          {
            name: 'Navigation and Containers'
          }
        ],
      },
      {
        name: 'Advanced Angular Material',
        children: [
          {
            name: 'Custom Themes'
          },
          {
            name: 'Tree Components'
          }
        ],
      },
    ],
  },
];

@Component({
  selector: 'tree-demo',
  templateUrl: 'tree-demo.component.html',
  styleUrls: ['tree-demo.component.scss']
})
export class TreeDemoComponent implements OnInit {

  // ------- Nested Tree ------------
  nestedDataSource = new MatTreeNestedDataSource<CourseNode>();
  //! in questo modo il controllo sa come estrarre i figli di un dato nodo.
  nestedTreeControl = new NestedTreeControl<CourseNode>(node => node.children);

  // ------- Flat Tree
  flatTreeControl = new FlatTreeControl<CourseFlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener((node: CourseNode, level: number) => {
    return {
      name: node.name,
      expandable: node.children?.length > 0,
      level
    }
  },
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  flatDataSource = new MatTreeFlatDataSource(this.flatTreeControl, this.treeFlattener);



  ngOnInit() {
    this.nestedDataSource.data = TREE_DATA;

  }

  hasNestedChild(index: number, node: CourseNode) {

    //! se maggiore di 0 allora è un nodo espandibile.
    return node?.children?.length > 0;
  }

  hasFlatChild() { }

}


